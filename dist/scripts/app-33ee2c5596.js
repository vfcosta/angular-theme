!function(){"use strict";angular.module("angular",["ngAnimate","ngCookies","ngStorage","ngTouch","ngSanitize","ngMessages","ngAria","restangular","ui.router","ui.bootstrap","toastr","angularMoment","angular.filter","akoenig.deckgrid","angular-timeline","duScroll","oitozero.ngSweetAlert"])}(),function(){"use strict";function e(){function e(e,o){var t=this;t.profile=t.owner,t.documents=[],t.openDocument=function(e){o.go("main.profile.page",{page:e.path,profile:e.profile.identifier})};var i=t.block.settings.limit||5;e.profiles.one(t.profile.id).one("articles").get({content_type:"TinyMceArticle",per_page:i}).then(function(e){t.documents=e.data.articles})}e.$inject=["noosfero","$state"];var o={restrict:"E",templateUrl:"app/components/noosfero-blocks/recent-documents/recent-documents.html",scope:{block:"=",owner:"="},controller:e,controllerAs:"vm",bindToController:!0};return o}angular.module("angular").directive("noosferoRecentDocumentsBlock",e)}(),function(){"use strict";function e(){function e(){var e=this;e.profile=e.owner}var o={restrict:"E",templateUrl:"app/components/noosfero-blocks/profile-image/profile-image.html",scope:{block:"=",owner:"="},controller:e,controllerAs:"vm",bindToController:!0};return o}angular.module("angular").directive("noosferoProfileImageBlock",e)}(),function(){"use strict";function e(){function e(e){var o=this;o.members=[],e.members(e.profiles.one(o.owner.id)).one().get({per_page:6}).then(function(e){o.members=e.data.people})}e.$inject=["noosfero"];var o={restrict:"E",templateUrl:"app/components/noosfero-blocks/members-block/members-block.html",scope:{block:"=",owner:"="},controller:e,controllerAs:"vm",bindToController:!0};return o}angular.module("angular").directive("noosferoMembersBlock",e)}(),function(){"use strict";function e(){function e(){}var o={restrict:"E",templateUrl:"app/components/noosfero-blocks/main-block/main-block.html",scope:{block:"=",owner:"="},controller:e,controllerAs:"vm",bindToController:!0};return o}angular.module("angular").directive("noosferoMainBlock",e)}(),function(){"use strict";function e(){function e(){var e=this;e.links=e.block.settings.links}var o={restrict:"E",templateUrl:"app/components/noosfero-blocks/link-list/link-list.html",scope:{block:"=",owner:"="},controller:e,controllerAs:"vm",bindToController:!0};return o}angular.module("angular").directive("noosferoLinkListBlock",e)}(),function(){"use strict";function e(){function e(e){var o=this;o.posts=[],o.perPage=3,o.currentPage=1,o.loadPage=function(){e.articles.one(o.article.id).customGET("children",{content_type:"TinyMceArticle",per_page:o.perPage,page:o.currentPage}).then(function(e){o.totalPosts=e.headers("total"),o.posts=e.data.articles})},o.loadPage()}e.$inject=["noosfero"];var o={restrict:"E",templateUrl:"app/components/noosfero-articles/blog/blog.html",scope:{article:"=",profile:"="},controller:e,controllerAs:"vm",bindToController:!0};return o}angular.module("angular").directive("noosferoBlog",e)}(),function(){"use strict";function e(e,o){function t(){}var i={restrict:"E",templateUrl:"app/components/noosfero-articles/article/article.html",scope:{article:"=",profile:"="},controller:t,controllerAs:"vm",bindToController:!0,link:function(t,i){var n="noosfero"+t.vm.article.type;if(e.has(n+"Directive")){var r=n.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();i.replaceWith(o("<"+r+' article="vm.article" profile="vm.profile"></'+r+">")(t))}}};return i}e.$inject=["$injector","$compile"],angular.module("angular").directive("noosferoArticle",e)}(),function(){"use strict";function e(){function e(){var e=this;e.getActivityTemplate=function(e){return"app/components/noosfero-activities/activity/"+e.verb+".html"}}var o={restrict:"E",scope:{activity:"="},templateUrl:"app/components/noosfero-activities/activity/activity.html",replace:!0,controller:e,controllerAs:"vm",bindToController:!0};return o}angular.module("angular").directive("noosferoActivity",e)}(),function(){"use strict";function e(){function e(){var e=this;e.defaultIcon="fa-users",e.profile&&"Person"===e.profile.type&&(e.defaultIcon="fa-user")}var o={restrict:"E",templateUrl:"app/components/noosfero/profile-image/profile-image.html",scope:{profile:"="},controller:e,controllerAs:"vm",bindToController:!0};return o}angular.module("angular").directive("noosferoProfileImage",e)}(),function(){"use strict";function e(){function e(){var e=this;e.boxesOrder=function(e){return 2==e.position?0:e.position}}var o={restrict:"E",scope:{boxes:"=",owner:"="},templateUrl:"app/components/noosfero-boxes/boxes.html",controller:e,controllerAs:"vm",bindToController:!0};return o}angular.module("angular").directive("noosferoBoxes",e)}(),function(){"use strict";function e(e){var o={restrict:"E",scope:{block:"=",owner:"="},link:function(o,t){var i=o.block.type.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();t.replaceWith(e("<noosfero-"+i+' block="block" owner="owner"></noosfero-'+i+">")(o))}};return o}e.$inject=["$compile"],angular.module("angular").directive("noosferoBlock",e)}(),function(){"use strict";function e(){var e={restrict:"E",scope:{activities:"="},templateUrl:"app/components/noosfero-activities/activities.html"};return e}angular.module("angular").directive("noosferoActivities",e)}(),function(){"use strict";angular.module("angular").factory("noosfero",["Restangular",function(e){var o;return{currentProfile:o,profiles:e.service("profiles"),articles:e.service("articles"),profile:function(o){return e.one("profiles",o)},members:function(o){return e.service("members",o)},boxes:function(o){return e.service("boxes",e.one("profiles",o))}}}])}(),function(){"use strict";angular.module("angular").filter("noosferoTemplateFilter",function(){return function(e,o){for(var t in o)e=e.replace("{"+t+"}",o[t]);return e}})}(),function(){"use strict";function e(){function e(e,o,t,i,n,r,a){var l=this;l.currentUser=i.getCurrentUser(),l.modalInstance=null,l.openLogin=function(){l.modalInstance=o.open({templateUrl:"app/components/auth/login.html",controller:"AuthController",controllerAs:"vm",bindToController:!0})},l.logout=function(){t.logout(),r.go(r.current,{},{reload:!0})},n.$on(a.loginSuccess,function(){l.modalInstance&&(l.modalInstance.close(),l.modalInstance=null),r.go(r.current,{},{reload:!0})}),n.$on(a.logoutSuccess,function(){l.currentUser=i.getCurrentUser()}),l.activate=function(){l.currentUser||l.openLogin()},l.activate()}e.$inject=["moment","$modal","AuthService","Session","$scope","$state","AUTH_EVENTS"];var o={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{},controller:e,controllerAs:"vm",bindToController:!0};return o}angular.module("angular").directive("acmeNavbar",e)}(),function(){"use strict";function e(e,o,t,i,n,r){function a(e){var t="/api/v1/login",i="login="+e.username+"&password="+e.password;return o.post(t,i).then(s,c)}function l(){var e="/api/v1/login_from_cookie";return o.post(e).then(s,c)}function s(e){n.debug("AuthService.login [SUCCESS] response",e);var o=i.create(e.data);return t.currentUser=o,t.$broadcast(r.loginSuccess,o),o}function c(e){return n.debug("AuthService.login [FAIL] response",e),t.$broadcast(r.loginFailed),null}function p(){i.destroy(),t.currentUser=void 0,t.$broadcast(r.logoutSuccess),o.jsonp("/account/logout")}function u(){return!!i.userId}function m(e){return angular.isArray(e)||(e=[e]),f.isAuthenticated()&&-1!==e.indexOf(i.userRole)}var f={login:a,loginFromCookie:l,logout:p,isAuthenticated:u,isAuthorized:m};return f}function o(e,o){var t={};return t.create=function(t){return e.currentUser=t.user,o.debug("User session created.",e.currentUser),e.currentUser},t.destroy=function(){delete e.currentUser,o.debug("User session destroyed.")},t.getCurrentUser=function(){return e.currentUser},t}e.$inject=["$q","$http","$rootScope","Session","$log","AUTH_EVENTS"],o.$inject=["$localStorage","$log"],angular.module("angular").factory("Session",o).factory("AuthService",e)}(),function(){"use strict";function e(e,o,t,i){var n=this;n.credentials={},n.login=function(){i.login(n.credentials)}}e.$inject=["noosfero","$log","$stateParams","AuthService"],angular.module("angular").controller("AuthController",e)}(),function(){"use strict";function e(e){function o(){t.profile=e.currentProfile,e.profiles.one(t.profile.id).one("activities").get().then(function(e){t.activities=e.data.activities})}var t=this;t.profile=null,t.activities=[],o()}e.$inject=["noosfero"],angular.module("angular").controller("ProfileInfoController",e)}(),function(){"use strict";function e(e,o,t){function i(){e.profiles.one().get({identifier:t.profile}).then(function(o){return n.profile=o.data[0],e.currentProfile=n.profile,e.boxes(n.profile.id).one().get()}).then(function(e){n.boxes=e.data.boxes})}var n=this;n.boxes=[],i()}e.$inject=["noosfero","$log","$stateParams"],angular.module("angular").controller("ProfileController",e)}(),function(){"use strict";function e(e,o,t,i,n){function r(){a.profile=e.currentProfile,e.profile(a.profile.id).customGET("home_page",{fields:"path"}).then(function(e){e.data.article?n.transitionTo("main.profile.page",{page:e.data.article.path,profile:a.profile.identifier},{location:!1}):n.transitionTo("main.profile.info",{profile:a.profile.identifier},{location:!1})})}var a=this;r()}e.$inject=["noosfero","$log","$stateParams","$scope","$state"],angular.module("angular").controller("ProfileHomeController",e)}(),function(){"use strict";function e(){}angular.module("angular").controller("MainController",e)}(),function(){"use strict";function e(e,o,t){function i(){n.profile=e.currentProfile,e.profiles.one(n.profile.id).one("articles").get({path:t.page}).then(function(e){n.article=e.data.article})}var n=this;n.article=null,n.profile=null,i()}e.$inject=["noosfero","$log","$stateParams"],angular.module("angular").controller("ContentViewerController",e)}(),function(){"use strict";function e(e){function o(){t.profile=e.currentProfile}var t=this;t.article=null,t.profile=null,o()}e.$inject=["noosfero"],angular.module("angular").controller("ContentViewerActionsController",e)}(),function(){"use strict";function e(e,o,t,i,n){function r(){a.profile=e.currentProfile}var a=this;a.article={},a.profile=null,r(),a.save=function(){e.profiles.one(a.profile.id).customPOST({article:a.article},"articles",{},{"Content-Type":"application/json"}).then(function(e){i.transitionTo("main.profile.page",{page:e.data.article.path,profile:a.profile.identifier}),n.swal({title:"Good job!",text:"Article saved!",type:"success",timer:1e3})})}}e.$inject=["noosfero","$stateParams","$httpParamSerializer","$state","SweetAlert"],angular.module("angular").controller("CmsController",e)}(),function(){"use strict";function e(e,o,t){o.addFullRequestInterceptor(function(e,o,i,n,r){return t.getCurrentUser()&&(r["Private-Token"]=t.getCurrentUser().private_token),{headers:r}})}e.$inject=["$log","Restangular","Session"],angular.module("angular").run(e)}(),function(){"use strict";function e(e,o){e.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"vm",resolve:{currentUser:["AuthService",function(e){return e.loginFromCookie()}]}}).state("main.profile.cms",{url:"^/myprofile/:profile/cms",views:{mainBlockContent:{templateUrl:"app/cms/cms.html",controller:"CmsController",controllerAs:"vm"}}}).state("main.profile.settings",{url:"^/myprofile/:profile"}).state("main.profile",{url:"^/:profile","abstract":!0,views:{content:{templateUrl:"app/profile/profile.html",controller:"ProfileController",controllerAs:"vm"}}}).state("main.profile.home",{url:"",views:{mainBlockContent:{controller:"ProfileHomeController",controllerAs:"vm"}}}).state("main.profile.info",{url:"^/profile/:profile",views:{mainBlockContent:{templateUrl:"app/profile-info/profile-info.html",controller:"ProfileInfoController",controllerAs:"vm"}}}).state("main.profile.page",{url:"/{page:any}",views:{mainBlockContent:{templateUrl:"app/content-viewer/page.html",controller:"ContentViewerController",controllerAs:"vm"},"actions@main":{templateUrl:"app/content-viewer/navbar-actions.html",controller:"ContentViewerActionsController",controllerAs:"vm"}}}),o.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("angular").config(e)}(),function(){"use strict";angular.module("angular").constant("moment",moment).constant("AUTH_EVENTS",{loginSuccess:"auth-login-success",loginFailed:"auth-login-failed",logoutSuccess:"auth-logout-success"})}(),function(){"use strict";function e(e,o,t,i,n){e.debugEnabled(!0),o.html5Mode({enabled:!0}),t.setBaseUrl("/api/v1"),t.setFullResponse(!0),i.defaults.headers.post={"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},n.decorator("$uiViewScroll",["$delegate","$document",function(e,o){return function(e){o.scrollToElementAnimated(e)}}])}e.$inject=["$logProvider","$locationProvider","RestangularProvider","$httpProvider","$provide"],angular.module("angular").config(e)}(),angular.module("angular").run(["$templateCache",function(e){e.put("app/cms/cms.html",'<form><div class="form-group"><label for="titleInput">Title</label> <input type="text" class="form-control" id="titleInput" placeholder="title" ng-model="vm.article.name"></div><div class="form-group"><label for="bodyInput">Text</label> <textarea class="form-control" id="bodyInput" rows="10" ng-model="vm.article.body"></textarea></div><button type="submit" class="btn btn-default" ng-click="vm.save()">Save</button></form>'),e.put("app/content-viewer/navbar-actions.html",'<ul class="nav navbar-nav navbar-right"><li><a href="#" role="button" ui-sref="main.profile.cms({profile: vm.profile.identifier})"><span class="fa-stack"><i class="fa fa-file-o fa-stack-2x"></i> <i class="fa fa-plus fa-stack-1x"></i></span> New Post</a></li></ul>'),e.put("app/content-viewer/page.html",'<noosfero-article ng-if="vm.article" article="vm.article" profile="vm.profile"></noosfero-article>'),e.put("app/main/main.html",'<acme-navbar></acme-navbar><div ui-view="content"></div>'),e.put("app/profile/profile.html",'<div class="profile-container"><div class="row"><noosfero-boxes boxes="vm.boxes" owner="vm.profile"></noosfero-boxes></div></div>'),e.put("app/profile-info/profile-info.html",'<h3>{{vm.profile.name}}</h3><div class="profile-wall"><h4>Profile Wall</h4><noosfero-activities activities="vm.activities"></noosfero-activities></div>'),e.put("app/components/auth/login.html",'<div class="modal-header"><h3 class="modal-title">Login</h3></div><div class="modal-body"><form><div class="form-group"><label for="exampleInputEmail1">Login / Email address</label> <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Login / Email" ng-model="vm.credentials.username"></div><div class="form-group"><label for="exampleInputPassword1">Password</label> <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="vm.credentials.password"></div><button type="submit" class="btn btn-default" ng-click="vm.login()">Login</button></form></div>'),e.put("app/components/boxes/boxes.html",'{{vm.boxesOrder}} {{boxesOrder}}<ng-include ng-repeat="box in vm.boxes | orderBy: vm.boxesOrder" src="\'app/components/noosfero-boxes/box.html\'"></ng-include>'),e.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle collapsed" ng-click="isCollapsed = !isCollapsed"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand" ui-sref="main"><span class="noosfero-logo"><img src="/designs/themes/angular-theme/dist/assets/images/logo-noosfero.png"></span> Noosfero</a></div><div class="collapse navbar-collapse" id="navbar-collapse" collapse="isCollapsed"><ul class="nav navbar-nav"></ul><ul class="nav navbar-nav navbar-right"><li ng-show="!vm.currentUser"><a ng-href="#" ng-click="vm.openLogin()">Login</a></li><li class="dropdown profile-menu" ng-show="vm.currentUser" dropdown=""><a href="#" class="dropdown-toggle" aria-expanded="false" dropdown-toggle=""><noosfero-profile-image profile="vm.currentUser.person" class="profile-image"></noosfero-profile-image><span ng-bind="vm.currentUser.person.name"></span> <b class="caret"></b></a><ul class="dropdown-menu" dropdown-menu=""><li><a ui-sref="main.profile.info({profile: vm.currentUser.person.identifier})"><i class="fa fa-fw fa-user"></i> Profile</a></li><li><a target="_self" ui-sref="main.profile.settings({profile: vm.currentUser.person.identifier})"><i class="fa fa-fw fa-gear"></i> Settings</a></li><li class="divider"></li><li><a href="#" ng-click="vm.logout()"><i class="fa fa-fw fa-power-off"></i> Log Out</a></li></ul></li></ul><div ui-view="actions"></div></div></div></nav>'),e.put("app/components/noosfero-activities/activities.html",'<timeline><timeline-event ng-repeat="activity in activities | orderBy: \'created_at\':true"><noosfero-activity activity="activity"></noosfero-activity></timeline-event></timeline>'),e.put("app/components/noosfero-boxes/box.html",'<div ng-class="{\'col-md-2-5\': box.position!=1, \'col-md-7\': box.position==1}"><div ng-repeat="block in box.blocks | orderBy: \'position\'" class="panel panel-default block {{block.type | lowercase}}"><div class="panel-heading" ng-show="block.title"><h3 class="panel-title">{{block.title}}</h3></div><div class="panel-body"><noosfero-block block="block" owner="vm.owner"></noosfero-block></div></div></div>'),e.put("app/components/noosfero-boxes/boxes.html",'<ng-include ng-repeat="box in vm.boxes | orderBy: vm.boxesOrder" src="\'app/components/noosfero-boxes/box.html\'"></ng-include>'),e.put("app/components/noosfero/profile-image/profile-image.html",'<span title="{{vm.profile.name}}"><img ng-if="vm.profile.image" ng-src="{{vm.profile.image.url}}" class="img-responsive profile-image"> <i ng-if="!vm.profile.image" class="fa {{vm.defaultIcon}} fa-5x profile-image"></i></span>'),e.put("app/components/noosfero-activities/activity/activity.html",'<div class="activity"><ng-include src="vm.getActivityTemplate(vm.activity)"></ng-include></div>'),e.put("app/components/noosfero-activities/activity/add_member_in_community.html",'<timeline-badge class="info"><i class="fa fa-user-plus"></i></timeline-badge><timeline-panel><timeline-heading><h4 class="timeline-title"><a ui-sref="main.profile.info({profile: vm.activity.user.identifier})"><strong ng-bind="vm.activity.user.name"></strong></a> <span>has joined the community</span></h4><p><small class="text-muted"><i class="fa fa-clock-o"></i> <span am-time-ago="vm.activity.created_at"></span></small></p></timeline-heading><div class="timeline-body"></div></timeline-panel>'),e.put("app/components/noosfero-activities/activity/create_article.html",'<timeline-badge class="success"><i class="fa fa-file-text"></i></timeline-badge><timeline-panel><timeline-heading><h4 class="timeline-title"><a ui-sref="main.profile.info({profile: vm.activity.user.identifier})"><strong ng-bind="vm.activity.user.name"></strong></a> <span>has published on</span> <a ui-sref="main.profile.info({profile: vm.activity.target.article.profile.identifier})"><strong ng-bind="vm.activity.target.article.profile.name"></strong></a></h4><p><small class="text-muted"><i class="fa fa-clock-o"></i> <span am-time-ago="vm.activity.created_at"></span></small></p></timeline-heading><div class="timeline-body"><div class="article"><div class="title"><a ui-sref="main.profile.page({profile: vm.activity.target.article.profile.identifier, page: vm.activity.target.article.path})" ng-bind="vm.activity.target.article.title"></a></div><div class="lead small"><div ng-bind-html="vm.activity.target.article.body | stripTags | truncate: 100 : \'...\': true"></div></div></div></div></timeline-panel>'),e.put("app/components/noosfero-activities/activity/new_friendship.html",'<timeline-badge class="info"><i class="fa fa-user-plus"></i></timeline-badge><timeline-panel><timeline-heading><h4 class="timeline-title"><a ui-sref="main.profile.info({profile: vm.activity.user.identifier})"><strong ng-bind="vm.activity.user.name"></strong></a> <span>has made <span ng-bind="vm.activity.params.friend_name.length"></span> new friend(s):</span> <span class="comma-separated"><a class="separated-item" ui-sref="main.profile.info({profile: vm.activity.params.friend_url[$index].profile})" ng-repeat="friend in vm.activity.params.friend_name"><strong ng-bind="friend"></strong></a></span></h4><p><small class="text-muted"><i class="fa fa-clock-o"></i> <span am-time-ago="vm.activity.created_at"></span></small></p></timeline-heading><div class="timeline-body"></div></timeline-panel>'),e.put("app/components/noosfero-articles/article/article.html",'<div class="article"><div class="page-header"><h3 ng-bind="vm.article.title"></h3></div><div class="sub-header clearfix"><div class="page-info pull-right small text-muted"><span class="time"><i class="fa fa-clock-o"></i> <span am-time-ago="vm.article.created_at"></span></span> <span class="author" ng-if="vm.article.author"><i class="fa fa-user"></i> <a ui-sref="main.profile({profile: vm.article.author.identifier})"><span class="author-name" ng-bind="vm.article.author.name"></span></a></span></div></div><div class="page-body"><div ng-bind-html="vm.article.body"></div></div></div>'),e.put("app/components/noosfero-articles/blog/blog.html",'<div class="blog"><div class="blog-cover" ng-show="vm.article.image"><img ng-src="{{vm.article.image.url}}" class="img-responsive"><h3 ng-bind="vm.article.title"></h3></div><div class="page-header" ng-show="!vm.article.image"><h3 ng-bind="vm.article.title"></h3></div><div><div ng-repeat="child in vm.posts | orderBy: \'created_at\':true"><div class="page-header"><a class="title" ui-sref="main.profile.page({profile: vm.profile.identifier, page: child.path})"><h4 ng-bind="child.title"></h4></a><div class="post-lead" ng-bind-html="child.body | truncate: 500: \'...\': true"></div></div></div></div><pagination ng-model="vm.currentPage" total-items="vm.totalPosts" class="pagination-sm center-block" boundary-links="true" items-per-page="vm.perPage" ng-change="vm.loadPage()" first-text="«" last-text="»" previous-text="‹" next-text="›"></pagination></div>'),e.put("app/components/noosfero-blocks/link-list/link-list.html",'<div class="link-list-block"><div ng-repeat="link in vm.links"><a ng-href="{{link.address | noosferoTemplateFilter:{profile: vm.owner.identifier} }}"><i class="fa fa-fw icon-{{link.icon}}"></i> <span>{{link.name}}</span></a></div></div>'),e.put("app/components/noosfero-blocks/main-block/main-block.html",'<div ui-view="mainBlockContent" autoscroll=""></div>'),e.put("app/components/noosfero-blocks/members-block/members-block.html",'<div class="members-block"><a ng-repeat="member in vm.members" ui-sref="main.profile({profile: member.identifier})" class="member"><noosfero-profile-image profile="member"></noosfero-profile-image></a></div>'),e.put("app/components/noosfero-blocks/profile-image/profile-image.html",'<div class="center-block text-center profile-image-block"><a ui-sref="main.profile.info({profile: vm.owner.identifier})"><noosfero-profile-image profile="vm.owner"></noosfero-profile-image></a> <a class="settings-link" target="_self" ui-sref="main.profile.settings({profile: vm.owner.identifier})">Control panel</a></div>'),e.put("app/components/noosfero-blocks/recent-documents/recent-documents.html",'<div deckgrid="" source="vm.documents" class="deckgrid"><div class="a-card panel media" ng-click="mother.vm.openDocument(card);"><div class="author media-left" ng-show="card.author.image"><img ng-src="{{card.author.image.url}}" class="img-circle"></div><div class="header media-body"><h5 class="title media-heading" ng-bind="card.title"></h5><div class="subheader"><span class="time"><i class="fa fa-clock-o"></i> <span am-time-ago="card.created_at"></span></span></div></div><img ng-show="card.image" ng-src="{{card.image.url}}" class="img-responsive article-image"><div class="post-lead" ng-bind-html="card.body | stripTags | truncate: 100: \'...\': true"></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-33ee2c5596.js.map
