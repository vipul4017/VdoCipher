import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCallApi } from '../../utils/utils';
import {  API_URL } from '../../constants/index';
import '../../assets/css/home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        words: []
    }
  }

  submitNumber = (e) =>{
      let currentComponent = this;
      e.preventDefault();
      var number = document.getElementById("enterednumber").value;
      if(!number){
          currentComponent.refs.warningmessage.innerHTML = "Please enter a number";
          setTimeout(() => {
            currentComponent.refs.warningmessage.innerHTML = "";
              }, 1500
          );
          return
      }

      getCallApi(`${API_URL}/words/getList?input=${number}`)
          .then((data) => {
              if (data && data.success) {
                  this.setState({
                      words: data.data.frequentWords
                  });
              }
              else {
                currentComponent.refs.warningmessage.innerHTML = data.message;
                setTimeout(() => {
                  currentComponent.refs.warningmessage.innerHTML = "";
                    }, 1500
                );
                this.setState({
                  words: []
                });
              }
      })
      .catch((error) => {
        console.log('error', error );
        
      });
  }

  wordsTable = (word, index) => {
    return (
      <tr key={index}>
        <td>{word.name}</td>
        <td>{word.count}</td>
      </tr>
    )
  };

  render() {
      const words = this.state.words;
      return (
        <div className="App">
          <div className="container" style={{margin:'auto', width: '600px'}}>
            <h1 className="enter-number">Enter a number.</h1>
            
            <form id="submit-number-form" name="contact-us-form" onSubmit={(e)=>this.submitNumber(e)}>
              <input className="search_3"  id="enterednumber" placeholder="Enter.."/>
              <input type="submit" className="submit_3" value="Submit"/>
            </form>
            <p ref='warningmessage' style={{ fontFamily: "Lato",color: "#ef6b5b",fontSize: "15px",marginTop:8, fontWeight:600, textAlign:"center" }}></p>
            {words.length>0 &&<p style={{ fontFamily: "Lato",color: "#fff",fontSize: "15px",marginTop:8, fontWeight:600, textAlign:"left" }}>{words.length === 1 ? 'Most frequently occurring word' : `Top ${words.length} most frequently occurring words`}</p>}
            {words.length>0 && <div className="card-stack">
            <table>
              <tbody>
                <tr>
                  <th>Word</th>
                  <th>Frequency</th>
                </tr>
                { words.map(this.wordsTable)}
              </tbody>
            </table>
            </div>}
          </div>
        </div>
      );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
      dispatch: dispatch
  }
};

export default connect(state => state, mapDispatchToProps)(Home);

