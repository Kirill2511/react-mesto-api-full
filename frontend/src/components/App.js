import React from 'react';
import {
  Switch, Route, Redirect, useHistory,
} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import DeletePopup from './DeletePopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import authSuccess from '../images/authSuccess.svg';
import authError from '../images/authError.svg';

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfile] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatar] = React.useState(false);
  const [isAddPlacePopupOpen, setAddCard] = React.useState(false);
  const [deletedCard, setDeletedCard] = React.useState(null);
  const [isPopupWithDeleteOpen, setPopupWithDelete] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isPopupImageOpen, setPopupImage] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggingIn, setLoggingIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [tooltipImage, setTooltipImage] = React.useState('');
  const [message, setMessage] = React.useState('');
  const history = useHistory();

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggingIn(true);
            history.push('/');
          }
        })
        .catch((error) => {
          if (error === 400) console.log('Токен не передан или не верен');
          if (error === 401) console.log('Токен не корректен');
          setLoggingIn(false);
        });
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function onRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res.data.email) {
          setLoggingIn(true);
          setIsInfoTooltipOpen(true);
          setTooltipImage(authSuccess);
          setMessage('Вы успешно зарегистрировались!');
          history.push('/signin');
        }
      })
      .catch((error) => {
        setIsInfoTooltipOpen(true);
        setTooltipImage(authError);
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        if (error === 'Ошибка: 400') console.log('некорректно заполнены данные');
      });
  }

  function onLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setEmail(email);
          history.push('/');
          setLoggingIn(true);
        }
      })
      .catch((error) => {
        setIsInfoTooltipOpen(true);
        setTooltipImage(authError);
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        if (error === 'Ошибка: 400') {
          console.log('не передано одно из полей');
        } else if (error === 'Ошибка: 401') {
          console.log('Пользователь с данным email не найден');
        }
      });
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setLoggingIn(false);
    setEmail('');
    history.push('/signin');
  }

  function handleEditProfileClick() {
    setEditProfile(true);
  }

  function handleEditAvatarClick() {
    setEditAvatar(true);
  }

  function handleAddCardClick() {
    setAddCard(true);
  }

  function handleCardClick(card) {
    setPopupImage(true);
    setSelectedCard(card);
  }

  function handleDeleteClick(card) {
    setPopupWithDelete(true);
    setDeletedCard(card);
  }

  function closeAllPopups() {
    setEditProfile(false);
    setEditAvatar(false);
    setAddCard(false);
    setPopupImage(false);
    setPopupWithDelete(false);
    setSelectedCard(null);
    setDeletedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handlerEscClose(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function closeByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handlerEscClose);
    document.addEventListener('click', closeByOverlay);
    return () => {
      document.removeEventListener('keydown', handlerEscClose);
      document.removeEventListener('click', closeByOverlay);
    };
  }, []);

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([cards, userData]) => {
        const { data } = userData;
        setCurrentUser({
          _id: data._id,
          name: data.name,
          about: data.about,
          avatar: data.avatar,
        });
        setCards(cards.map((item) => ({
          name: item.name,
          link: item.link,
          likes: item.likes,
          owner: item.owner,
          id: item._id,
        })));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCardLike = (card) => {
    const isLiked = (card.likes.some(
      (i) => i === currentUser._id,
    ));
    const likeAction = isLiked ? 'удалить' : 'поставить';
    const likeFunc = isLiked ? (id) => api.dislikeCard(id) : (id) => api.likeCard(id);

    likeFunc(card.id)
      .then(({ data }) => {
        const changedCard = {
          name: data.name, link: data.link, likes: data.likes, owner: data.owner, id: data._id,
        };
        const newCards = cards.map((currentCard) => (
          currentCard.id === card.id ? changedCard : currentCard
        ));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Невозможно ${likeAction} лайк. Ошибка ${err}.`);
      });
  };

  const handleCardDelete = (card) => {
    setIsLoading(true);
    api
      .deleteCard(card.id)
      .then(() => {
        const newCards = cards.filter((c) => c.id !== card.id);
        setCards(newCards);
        console.log(`Карточка ${card.id} удалена.`);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Невозможно удалить карточку. Ошибка ${err}.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleUpdateUser(items) {
    setIsLoading(true);
    api
      .setUserInfo(items)
      .then(({ data }) => {
        setCurrentUser({
          ...currentUser,
          name: data.name,
          about: data.about,
        });
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(item) {
    setIsLoading(true);
    api
      .setUserAvatar(item)
      .then(({ data }) => {
        setCurrentUser({
          ...currentUser,
          avatar: data.avatar,
        });
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newPlace) {
    setIsLoading(true);
    api
      .postNewCard({ name: newPlace.name, link: newPlace.link })
      .then(({ data }) => {
        const newCard = {
          name: data.name,
          link: data.link,
          likes: data.likes,
          owner: data.owner,
          id: data._id,
        };
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggingIn={loggingIn} userEmail={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute exact path="/" loggingIn={loggingIn}>
            <Main
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddCardClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
            />
          </ProtectedRoute>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/">
            {
              loggingIn ? <Redirect to="/" /> : <Redirect to="/signin" />
            }
          </Route>
        </Switch>
        <Footer />

        {/* Попат обновления аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        {/* Попат редактирования профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        {/* Попат добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isClose={closeAllPopups}
          postNewCard={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        {/* Попат подтверждения */}
        <DeletePopup
          isOpen={isPopupWithDeleteOpen}
          isClose={closeAllPopups}
          onDelete={handleCardDelete}
          card={deletedCard}
          isLoading={isLoading}
        />

        {/* Попат увеличения картинки */}
        <ImagePopup
          isOpen={isPopupImageOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          image={tooltipImage}
          message={message}
          loggingIn={loggingIn}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
