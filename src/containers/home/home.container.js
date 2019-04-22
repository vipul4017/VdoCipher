import React, { Component } from 'react';
import { getCallApi, postCallApi } from '../../utils/utils';
import {  API_URL } from '../../constants/index';
import '../../assets/css/home.css';
import {LeftArrow, RightArrow} from '../../components/arrows'
import {Slide, Indicators} from '../../components/Slide'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentIndex: 0,
      imagesUrlObj: {},
      canClick: true
    }
  }

  // Calling api to get image IDs
  componentDidMount(){
    this.getImagesIds();
  }

  getImagesIds = () => {
      let _this = this;
      getCallApi(`${API_URL}/image`)
          .then((data) => {
              if (data) {
                _this.setState({
                      imageIds: data
                  },() => _this.getImagesUrl());
                  _this.autoplayTimer = setInterval(()=>{
                    _this.autoplaySlides();
                  },2000);
              }
      })
      .catch((error) => {
        console.log('error', error );
      });    
  }

  // Get Image URLs from their IDs from API
  getImagesUrl = () => {
    this.state.imageIds.forEach(element => {
      this.callImageUrlApi(element.id);
    });
  }

  callImageUrlApi = (imageId) =>{
    let _this = this;
      postCallApi(`${API_URL}/image/${imageId}`)
          .then((data) => {
            let imagesObj = _this.state.imagesUrlObj;
            imagesObj[data.id] = data.url
            this.setState({
              imagesUrlObj: imagesObj
            })
      })
      .catch((error) => {
        console.log('error', error );  
      });  
  }

  autoplaySlides = () => {
    let _this = this;
    this.setState(prevState => ({
      canClick: false
    }));
    if(this.state.currentIndex === this.state.imageIds.length - 1) {
      return this.setState({
        currentIndex: 0
      })
    }
    
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));

    this.allowClicking = setTimeout(()=>{
      _this.setState(prevState => ({
        canClick: true
      }));
    }, 1000)
  }

  resetAutoPlay = ()=> {
    let _this = this;
    clearInterval(this.autoplayTimer);
    _this.autoplayTimer = setInterval(()=>{
        _this.autoplaySlides();
      },2000);
  }

  goToPrevSlide = () => {
    // pause autoplay while manually sliding
    this.resetAutoPlay();

    // To avoid multiple clicks when slide transition is in progress
    if(!this.state.canClick)
    return

    this.setState(prevState => ({
      canClick: !prevState.canClick
    }));
    this.allowClicking = setTimeout(()=>{
        this.setState({ canClick: true });
    },1000);

    let totalImages  = this.state.imageIds.length

    // When at first image
    if(this.state.currentIndex === 0) {
      return this.setState({
        currentIndex: totalImages - 1
      })
    }
    
    // This will not run if we met the if condition above
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1
    }))
  }

  goToNextSlide = () => {
    // pause autoplay while manually sliding
    this.resetAutoPlay();

    // To avoid multiple clicks when slide transition is in progress
    if(!this.state.canClick)
    return

    this.setState(prevState => ({
      canClick: !prevState.canClick
    }));
    this.allowClicking = setTimeout(()=>{
        this.setState({ canClick: true });
    },1000);

    // When at last image
    if(this.state.currentIndex === this.state.imageIds.length - 1) {
      return this.setState({
        currentIndex: 0
      })
    }
    
    // This will not run if we met the if condition above
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1
    }));
  }

  renderSlides = (image, index) =>{
    let totalImages  = this.state.imageIds.length;
    let imagesUrlObj = this.state.imagesUrlObj;
    let styles;

    // The positions of slides differ according to the currentIndex.
    // Their position from left changes using transition property which allows smooth sliding of 1 sec.
    
    // Slide currently visible
    if(this.state.currentIndex === index){
      styles = {
        left: '0px',
        transition: 'left ease-out 1.0s',
        zIndex: '2'
      };
    }
    // Slide on the right
    else if(this.state.currentIndex === (index - 1)){
      styles = {
        left: '750px',
        transition: 'left ease-out 1.0s',
        zIndex: '0'
      };
    }
    else if(this.state.currentIndex === (index - 2)){
      styles = {
        left: '-750px',
        transition: 'left ease-out 1.0s',
        zIndex: '-1'
      };
    }
    // Remaining Slides
    else{
      styles = {
        left: '-750px',
        transition: 'left ease-out 1.0s',
        zIndex: '1'
      };
    }
    // Edge cases when on last slide 
    if((this.state.currentIndex === (totalImages - 1 ))&& index === 0){
      styles = {
        left: '750px',
        transition: 'left ease-out 1.0s',
        zIndex: '0'
      };
    }

    if((this.state.currentIndex === (totalImages - 1 )) &&(index === 1)){
      styles = {
        left: '-750px',
        transition: 'left ease-out 1.0s',
        zIndex: '-1'
      };
    }
    // Edge cases when on second last slide 
    if((this.state.currentIndex === (totalImages - 2 )) &&(index === 0)){
      styles = {
        left: '-750px',
        // backgroundColor: '#f5f5f5',
        transition: 'left ease-out 1.0s',
        zIndex: '-1'
      };
    }

    styles.backgroundImage = `url('${imagesUrlObj[image.id]}')`;
    styles.top = `calc(50% - ${this.props.height}px / 2)`;
    styles.width = `${(this.state.windowWidth - 900)}px`;
    styles.backgroundRepeat = `no-repeat`;
    styles.height = `100%`;
    styles.backgroundSize = `cover`;
    styles.backgroundPosition = 'center';
    styles.display = 'inline-block';
    styles.position = 'absolute';
    styles.backgroundColor = '#f5f5f5';

    return (<Slide key={index} styles = {styles} image={imagesUrlObj[image.id]} />)
  }

  render() {
    let imageIds =  this.state.imageIds;
    let currentIndex = this.state.currentIndex;
    if(!imageIds){
      return null
    }

    return (
      <div className="App">
          <div className="slider">
              <div className="slider-wrapper">
                {imageIds.map(this.renderSlides)}
              </div>
              <LeftArrow
              goToPrevSlide={this.goToPrevSlide}
              />
              <RightArrow
              goToNextSlide={this.goToNextSlide}
              />
              <Indicators imagesArray={imageIds} currentIndex={currentIndex}/>
          </div>
      </div>
    );
  }

}


export default Home;

