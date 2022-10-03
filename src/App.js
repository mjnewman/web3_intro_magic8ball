import React, { Component } from 'react';
import Web3 from 'web3';

class App extends Component {
  
  state = { 
    web3: null,
    accounts: null,
    contract: '0x8f04D88f2Ad9Dd3e4cC6d1bE4532fe91Fd81A519',
    question: null,
    answer: null
  };

  componentDidMount = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum); 
        this.setState({ web3 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  connectWallet = async () => {
    const { web3 } = this.state;
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      
      this.setState({ web3, accounts });
    } catch (error) {
      alert('Failed to load web3 or accounts.');
      console.error(error);
    }
  };

  askQuestion = async () => {
    const { web3, contract, question, answer } = this.state;
    
    const instance = new web3.eth.Contract(
      [{"inputs": [{"internalType": "string","name": "question","type": "string"}],"name": "askQuestion","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"}],
      contract,
    );

    try {
      const _answer = await instance.methods.askQuestion(question).call();
      console.log(question + ' :: ' + _answer);
      this.setState({answer: _answer})
    } catch (error) {
      console.log(error);
    }    
  };

  updateQuestion = async (e) => {
    this.setState({question: e.target.value, answer: null});
  }

  render() {
    const self = this;
    return (
      <div>
        {!this.state.web3 &&
          <div>
            <h2>No Wallet Detected</h2>
            <p>Please enable a wallet such as Metamask</p>
          </div>
        }
        {!this.state.accounts && this.state.web3 &&
          <div>
            <h3>Magic 8 Ball</h3>
            <button onClick={this.connectWallet}>
              Connect Your Wallet
            </button>
          </div>
        }        
        {this.state.accounts &&
          <div>
            <h3>Magic 8 Ball</h3>
            <input type="text" placeholder="Enter a Question" onChange={this.updateQuestion} />&nbsp;
            <button onClick={this.askQuestion}>
              Ask a Question
            </button>
          </div>
        }
        
        <div className="toy">
          <form className="ball">
            <div className="window"></div>
            <div className="answers">
              <div className={`answer up ${this.state.answer ? "show" : ""}`}>
                {this.state.answer}
              </div>
            </div>
          </form>
        </div>

      </div>
    );
  }
}

export default App;
