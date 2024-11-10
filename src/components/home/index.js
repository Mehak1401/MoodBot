import React from "react";           // Import React (needed for JSX)
import ReactDOM from "react-dom";    // Import ReactDOM (needed to render the app)
import "./style.scss";               // Import your styles

const data = {
  headerText: "hello hello ✨",
  pText: "I'm one (1) cute bot!",
  p2Text: "Made with React + Dialogflow",
  userMessages: [],
  botMessages: [],
  botGreeting: "oh hi! who are you?",
  botLoading: false,
};

class Home extends React.Component {  // Changed from App to Home
  constructor(props) {
    super(props);
    this.state = data;
  }

  updateUserMessages = (newMessage) => {
    if (!newMessage) {
      return;
    }

    const updatedMessages = this.state.userMessages;
    const updatedBotMessages = this.state.botMessages;

    this.setState({
      userMessages: updatedMessages.concat(newMessage),
      botLoading: true,
    });

    const request = new Request(
      "https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=en&query=" +
        newMessage +
        "&sessionId=12345",
      {
        headers: new Headers({
          Authorization: "Bearer bc13467053ad45feaaa6f23c8bfafa9d",
        }),
      }
    );

    fetch(request)
      .then((response) => response.json())
      .then((json) => {
        const botResponse = json.result.fulfillment.speech;
        this.setState({
          botMessages: updatedBotMessages.concat(botResponse),
          botLoading: false,
        });
      })
      .catch((error) => {
        console.log("ERROR:", error);
        this.setState({
          botMessages: updatedBotMessages.concat("?"),
          botLoading: false,
        });
      });
  };

  scrollBubble = (element) => {
    if (element != null) {
      element.scrollIntoView(true);
    }
  };

  showMessages = () => {
    const { userMessages, botMessages, botGreeting } = this.state;
    const allMessages = [];

    let i = 0;
    for (; i < userMessages.length; i++) {
      if (i === userMessages.length - 1) {
        if (botMessages[i]) {
          allMessages.push(<UserBubble message={userMessages[i]} />);
          allMessages.push(
            <BotBubble message={botMessages[i]} thisRef={this.scrollBubble} />
          );
        } else {
          allMessages.push(
            <UserBubble message={userMessages[i]} thisRef={this.scrollBubble} />
          );
        }
        break;
      }

      allMessages.push(<UserBubble message={userMessages[i]} />);
      allMessages.push(<BotBubble message={botMessages[i]} />);
    }

    allMessages.unshift(
      <BotBubble
        message={botGreeting}
        thisRef={i === 0 ? this.scrollBubble : ""}
      />
    );

    return <div className="msg-container">{allMessages}</div>;
  };

  onInput = (event) => {
    if (event.key === "Enter") {
      const userInput = event.target.value;
      this.updateUserMessages(userInput);
      event.target.value = "";
    }

    if (event.target.value !== "") {
      event.target.parentElement.style.background = "rgba(69,58,148,0.6)";
    } else {
      event.target.parentElement.style.background = "rgba(255, 255, 255, 0.6)";
    }
  };

  onClick = () => {
    const inp = document.getElementById("chat");
    const userInput = inp.value;
    this.updateUserMessages(userInput);
    inp.value = "";
  };

  render() {
    return (
      <div className="app-container">
        <Header
          headerText={this.state.headerText}
          pText={this.state.pText}
          p2Text={this.state.p2Text}
        />
        <div className="chat-container">
          <ChatHeader />
          {this.showMessages()}
          <UserInput onInput={this.onInput} onClick={this.onClick} />
        </div>
      </div>
    );
  }
}

class UserBubble extends React.Component {
  render() {
    return (
      <div className="user-message-container" ref={this.props.thisRef}>
        <div className="chat-bubble user">{this.props.message}</div>
      </div>
    );
  }
}

class BotBubble extends React.Component {
  render() {
    return (
      <div className="bot-message-container" ref={this.props.thisRef}>
        <div className="bot-avatar" />
        <div className="chat-bubble bot">{this.props.message}</div>
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div className="header">
      <div className="header-img" />
      <h1>{props.headerText}</h1>
      <h2>{props.pText}</h2>
      <p>{props.p2Text}</p>
    </div>
  );
};

const ChatHeader = () => {
  return (
    <div className="chat-header">
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </div>
  );
};

const UserInput = (props) => {
  return (
    <div className="input-container">
      <input
        id="chat"
        type="text"
        onKeyPress={props.onInput}
        placeholder="type something"
      />
      <button className="input-submit" onClick={props.onClick} />
    </div>
  );
};

// Make sure you are correctly rendering the Home component
ReactDOM.render(<Home />, document.getElementById("home"));

export default Home; // Export Home correctly
