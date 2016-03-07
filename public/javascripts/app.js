$( document ).ready( function() {
  $(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[#projectsContainer=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
});



$('.projectsContainer').hide();
setTimeout(function(){
    $('.projectsContainer').addClass('magictime puffIn');
}, 100);



var ProjectsContainer = React.createClass({
  componentDidMount: function() {
    this.loadData();
  },
  loadData: function() {
    $.ajax({
      type: 'GET',
      url: "/javascripts/projects.json",
      dataType: 'json',
      cache: 'false',
      async: false,
      complete: function(obj) {
        console.log(obj.responseJSON.projects);
        this.setState({data: obj.responseJSON.projects});
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div id="app">
      <NavBar/>
      <About/>
      <h1 className="block-title">Projects</h1>
      <ProjectsGrid data={this.state.data} />
      <hr/>
      <Contact/>
      </div>
    );
  }
});

var NavBar = React.createClass({
  render: function() {
    return (
      <div className="nav-main">
          <div className="nav-item about">
            <button className="btn btn-default-outline nav-button">Me</button>
          </div>
          <div  className="nav-item projects">
            <a id="projects-link" href="#projectsContainer"><button className="btn btn-default-outline nav-button">Projects</button></a>
          </div>
          <div className="nav-item contact">
            <button className="btn btn-default-outline nav-button">Contact</button>
          </div>
      </div>
    );
  }
});

var About = React.createClass({
  render: function() {
    return (
      <div className="about-section">
        <h1>My name is Yasmine Esparza</h1>
        <hr></hr>
        <h3>Readymade helvetica taxidermy quinoa, street art DIY locavore kinfolk squid vice cold-pressed. Banjo bushwick vegan offal helvetica, kitsch man bun chicharrones. Authentic 90's paleo, cronut kogi ugh squid biodiesel artisan chillwave. Four dollar toast dreamcatcher salvia, gluten-free flexitarian health goth iPhone typewriter semiotics kitsch cornhole everyday carry vice. Raw denim kitsch umami chillwave, biodiesel williamsburg artisan tumblr cred skateboard salvia. Pitchfork tacos affogato, plaid etsy hella lomo portland craft beer. Cold-pressed 90's bitters normcore literally.</h3>
      </div>
    );
  }
});

var Contact = React.createClass({
  render: function() {
    return (
      <div className="contact-section">
          <div className="social-media">

          </div>
      </div>
    );
  }
});

var ProjectsGrid = React.createClass({
  render: function() {
    var projectGrid = this.props.data.map(function(project, index) {
      console.log(project);
      return (
        <Project title={project.title} url={project.url} id={project.id} />
      );
    });
    return (
      <div id="projectsContainer" className="magictime puffIn projectscontainer">
          { projectGrid }
      </div>
    );
  }
});

var Project = React.createClass({
  render: function() {
    return (
      <div className="project-block">
        <div className="title-backdrop">
          <h4 className="block-title">{this.props.title}</h4>
        </div>
        <img className="project-image" src={this.props.url} ></img>
      </div>
    )
  }
});

ReactDOM.render(
  <ProjectsContainer/>,
  document.getElementById('container')
);
