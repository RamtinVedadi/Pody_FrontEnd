<template>
  <div>
  </div>
</template>

<script>
  export default {
    layout: "play",
    name: 'playpage',
  }
</script>

<style>
  @import "../../assets/Styles/FontiranSans.css";
  @import "../../assets/Styles/PageSizingStyle.css";

  .podcast-title-md {
    width: 100%;
    line-height: 2.2rem;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }

  .podcast-title-xs {
    width: 100%;
    line-height: 2.2rem;
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 20px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }

  .podcast-info-md {
    font-size: 17px;
    color: #777;
    font-weight: 400;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
    margin-top: 3px;
    margin-bottom: 3px;
  }

  .description-title {
    font-size: 16px;
    color: #000;
    font-weight: 600;
    line-height: 22px;
    height: 22px;
    margin-bottom: 13px;
  }

  .podcast-description {
    font-size: 14px;
    color: #777;
    font-weight: 400;
    text-align: justify;
    padding-right: 20px;
    -webkit-transition: .3s;
    -o-transition: .3s;
    transition: .3s;
  }

  .other-comment-username {
    margin-right: 4px;
    margin-bottom: 2px;
    font-size: .9rem;
    font-weight: 500;
    line-height: 2.2rem;
  }

  .other-comment-data {
    margin-right: 4px;
    margin-bottom: 2px;
    font-size: .9rem;
    font-weight: 500;
    line-height: 2.2rem;
  }

  .listenLaterButton {
    bottom: 8px;
    right: 40px;
  }

  .shareButton {
    bottom: 8px;
    right: 60px;
  }
</style>
