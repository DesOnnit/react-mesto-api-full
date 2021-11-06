import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import CardDeletePopup from "./CardDeletePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login"
import Register from "./Register";
import { AuthContext } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import success from "../images/success.png";
import unSuccess from '../images/unsuccess.png';
import * as Auth from "../utils/Auth"

function App() {
  const history = useHistory()
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState({ imgInfo: '', text: '' })

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(item) {
    api
      .saveUserInfo(item)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(item) {
    api
      .handleAvatarChange(item)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        setEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(item) {
    api
      .getNewCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        setAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleRegister(password, email) {
    Auth.register(password, email)
      .then((res) => {
        setEmail(res.data.email)
        setMessage({ imgInfo: success, text: 'Вы успешно зарегистрировались!' })
      })
      .then(()=>{
        history.push('/sign-in')
      })
      .catch(() => setMessage({ imgInfo: unSuccess, text: 'Что-то пошло не так! Попробуйте ещё раз.' }))
      .finally(() => setIsInfoTooltipOpen(true))
  }

  function handleLogin(password, email) {
    Auth.authorize(password, email)
      .then((token) => {
        Auth.getContent(token)
          .then((res) => {
            setLoggedIn(true)
            setEmail(res.data.email)
            history.push('/')
          })
      })
      .catch((err) => console.log(err.status))
  }

  React.useEffect(() => {
    tokenCheck()
  }, [])

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      Auth.getContent(jwt)
        .then((res) => {
          setLoggedIn(true)
          setEmail(res.data.email)
          history.push('/')
        })
        .catch((err) => console.log(err))
    }
    history.push('/sign-up')
  }

  function handleSignOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={setLoggedIn}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            loggedIn={loggedIn}
            email={email}
            onSignOut={handleSignOut} />
          <Switch>
            <ProtectedRoute
              exact path="/"
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-in">
              <Login
                onLogin={handleLogin}
              />
            </Route>
            <Route path="/sign-up">
              <Register
                onRegister={handleRegister} />
            </Route>
          </Switch>
          <Footer />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            imgInfo={message.imgInfo}
            title={message.text}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdatePlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <CardDeletePopup />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
