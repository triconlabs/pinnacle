import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

export default Router.map(function () {
  this.route('test');
  this.route('login');
  this.route('auth');
  this.route('assesment');
  this.route('users');
  this.route('question');
  this.route('user', {
      path: '/user/:user_id'
  });
  this.route('wordcloud');
  this.route('profile');
  this.route('feedback');
  this.route('todos');
  this.route('project', {
      path: '/project/:project_id'
  });
  this.route('expertise', {
      path: '/expertise/:expertise_id'
  });
});
