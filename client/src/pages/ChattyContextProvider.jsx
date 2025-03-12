import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";

const ChattyContext = createContext();

export const ChattyProvider = ({ socket, children }) => {
  const [sideBarOpen, setSideBarState] = useState(true);
  const [rightBarOpen, setRightBarState] = useState(true);
  const [ModalState, setModalState] = useState(false);
  const [ModalRightState, setModalRightState] = useState(false);
  const [ContactWith, setContactWith] = useState(null);
  const [RoomWith, setRoomWith] = useState(null);
  const [CurrentUser, setCurrentUser] = useState(null);
  const [CurrentUserFullData, setCurrentUserFullData] = useState([]);
  const [notifyIsTyping, setNotifyIsTyping] = useState([]);
  // // socket.emit("test", "from Home");
  // const renderCount = useRef(0);
  // renderCount.current += 1;

  // useEffect(() => {
  //   socket.emit("test", `from Home - Render Count: ${renderCount.current}`);
  // });

  const sideBarHandlerOpen = useCallback(() => {
    setSideBarState(true);
  }, []);
  const sideBarHandlerClose = useCallback(() => {
    setSideBarState(false);
  }, []);

  const rightBarHandlerOpen = useCallback(() => {
    setRightBarState(true);
  }, []);
  const rightBarHandlerClose = useCallback(() => {
    setRightBarState(false);
  }, []);
  const OpenModalHandler = useCallback(() => {
    setModalState(true);
  }, []);

  const CloseModalHandler = useCallback(() => {
    setModalState(false);
  }, []);
  const CloseRightModalHandler = useCallback(() => {
    setModalRightState(false);
  }, []);
  const OpenRightModalHandler = useCallback(() => {
    setModalRightState(true);
  }, []);
  const OpenChatContainerHandler = useCallback((contactWithUser) => {
    setContactWith(contactWithUser);
    setRoomWith(null);
  }, []);
  const OpenRoomContainerHandler = useCallback((room) => {
    setRoomWith(room);
    setContactWith(null);
  }, []);
  const currentUserDataHandler = useCallback(
    (currentUserId, currentUserFullData) => {
      setCurrentUser(currentUserId);
      setCurrentUserFullData(currentUserFullData);
    },
    []
  );
  const notifyIsTypingHandler = useCallback((msg, senderId) => {
    setNotifyIsTyping(() => [msg, senderId]);
  }, []);
  const contextValue = useMemo(
    () => ({
      sideBarHandlerOpen,
      sideBarHandlerClose,
      sideBarOpen,
      rightBarHandlerClose,
      rightBarHandlerOpen,
      CloseRightModalHandler,
      OpenRightModalHandler,
      rightBarOpen,
      OpenModalHandler,
      CloseModalHandler,
      ModalState,
      ModalRightState,
      socket,
      OpenChatContainerHandler,
      ContactWith,
      OpenRoomContainerHandler,
      RoomWith,
      currentUserDataHandler,
      CurrentUser,
      CurrentUserFullData,
      notifyIsTypingHandler,
      notifyIsTyping,
    }),
    [
      sideBarOpen,
      rightBarOpen,
      ModalState,
      ModalRightState,
      socket,
      ContactWith,
      RoomWith,
      CurrentUser,
      CurrentUserFullData,
      notifyIsTyping,
    ]
  );

  return (
    <ChattyContext.Provider value={contextValue}>
      {children}
    </ChattyContext.Provider>
  );
};

export const useChattyContext = () => useContext(ChattyContext);
