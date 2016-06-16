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
     
      <ProjectsGrid data={this.state.data} />
     
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
        <p>and I love making art. I enjoy creating in various mediums including, oil paints, acrylics, and watercolour, and photography. I even do a bit of sculpting. These are my creations. </p>
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
    )
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
      <div id="projectsContainer" className="magictime puffIn projectsContainer col-md-12">
          { projectGrid }
      </div>
    );
  }
});

var Project = React.createClass({
  render: function() {
    return (
      <div className="project-block col-md-6">
        
          <h4 className="block-title">{this.props.title}</h4>
    
        <img className="project-image" src={this.props.url} ></img>
      </div>
    )
  }
});

ReactDOM.render(
  <ProjectsContainer/>,
  document.getElementById('container')
);
