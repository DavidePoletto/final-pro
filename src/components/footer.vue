<template>
    <footer class="footer">
      <div class="footer_content">
        <div class="footer_section about">
          <h3>About Us</h3>
          <p>
            Siamo appassionati di videogiochi, impegnati a fornire le ultime notizie, recensioni e aggiornamenti sui migliori titoli disponibili.
          </p>
        </div>
        
        <div class="footer_section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Videogames</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">News</a></li>
          </ul>
        </div>
        
        <div class="footer_section social">
          <h3>Follow Us</h3>
          <div class="social_icons">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      
      <div class="footer_bottom">
        <p>&copy; 2024 GameVerse. All rights reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'MainFooter',
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #222;
    color: #fff;
    padding: 40px 0;
    position: relative;
    width: 100%;
  }
  
  .footer_content {
    display: flex;
    justify-content: space-around;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer_section {
    flex: 1;
    margin: 0 20px;
  }
  
  .footer_section h3 {
    margin-bottom: 15px;
    font-size: 18px;
    text-transform: uppercase;
  }
  
  .footer_section p, .footer_section ul {
    font-size: 14px;
    line-height: 1.8;
  }
  
  .footer_section ul {
    list-style-type: none;
    padding: 0;
  }
  
  .footer_section ul li {
    margin-bottom: 10px;
  }
  
  .footer_section ul li a {
    color: #aaa;
    text-decoration: none;
  }
  
  .footer_section ul li a:hover {
    color: #fff;
  }
  
  .social_icons a {
    margin-right: 10px;
    color: #aaa;
    font-size: 20px;
    transition: color 0.3s ease;
  }
  
  .social_icons a:hover {
    color: #fff;
  }
  
  .footer_bottom {
    background-color: #111;
    text-align: center;
    padding: 20px;
    font-size: 14px;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  
  .footer_bottom p {
    margin: 0;
  }
  </style>
  