var Photo = Backbone.Model.extend({
  defaults: {
    orientation: 'horizontal',
    span: 1
  }
});
var PhotoCollection = Backbone.Collection.extend({
  mode: Photo,
  comparator: function(photo1, photo2) {
    return photo2.get('date') - photo1.get('date');
  },

  getForDate: function(date_filter) {
    return this.filter(function(photo) {
      return !date_filter || photo.get('date') == date_filter;
    });
  }
});

var Photos = new PhotoCollection([
  { src: '/img/IMG_1750.jpg', date: 20120707, orientation: 'vertical' },
  { src: '/img/IMG_1724.jpg', date: 20120707, orientation: 'horizontal' },
  
  { src: '/img/IMG_1487.jpg', date: 20120607, orientation: 'horizontal' },
  { src: '/img/IMG_1488.jpg', date: 20120607, orientation: 'horizontal' },
  { src: '/img/IMG_1504.jpg', date: 20120607, orientation: 'horizontal'  },
  { src: '/img/IMG_1519.jpg', date: 20120607, orientation: 'horizontal'  },
  { src: '/img/IMG_1525.jpg', date: 20120607, orientation: 'horizontal'  },
  { src: '/img/IMG_1562.jpg', date: 20120607, orientation: 'horizontal'  },
  { src: '/img/IMG_1617.jpg', date: 20120607, orientation: 'vertical'  },
  { src: '/img/IMG_1654.jpg', date: 20120607, orientation: 'horizontal'  },
  { src: '/img/IMG_1658.jpg', date: 20120607, orientation: 'horizontal'  },
  { src: '/img/IMG_0969.jpg', date: 20120607, orientation: 'horizontal', dimensions: 'threebyfour' },
  { src: '/img/IMG_0986.jpg', date: 20120607, orientation: 'horizontal', dimensions: 'threebyfour'  },
  { src: '/img/IMG_0995.jpg', date: 20120607, orientation: 'horizontal', dimensions: 'threebyfour'  },

  { src: '/img/20120512/IMG_1329.jpg', date: 20120512, orientation: 'horiztonal' },
  { src: '/img/20120512/IMG_1372.jpg', date: 20120512, orientation: 'horiztonal' },
  { src: '/img/20120512/IMG_1379.jpg', date: 20120512, orientation: 'horiztonal' },
  { src: '/img/20120512/IMG_1441.jpg', date: 20120512, orientation: 'horiztonal' },
  { src: '/img/20120512/IMG_1444.jpg', date: 20120512, orientation: 'vertical' },
  { src: '/img/20120512/IMG_1454.jpg', date: 20120512, orientation: 'horiztonal' }
]);


var events = {
  20120512: { name: 'Yosemite National Park' },
  20120607: { name: 'Zion National Park' },
  20120707: { name: 'Big Basin Redwoods State Park' }
};

/*
var ponders = [
  { text: 'Zion National Park', date: 20120607, classname: 'font32' },
  { text: 'Thundercats fap banh mi readymade, food truck retro pour-over narwhal. Godard viral cardigan, jean shorts cray beard american apparel brooklyn wayfarers irony twee butcher.', date: 20120631 }
];
*/
var ponders = [];


$(function() {
var Workspace = Backbone.Router.extend({
  routes: {
    "":                   "index",
    "focus/:date":        "focus"
  },

  index: function() {
  },

  focus: function(date) {
    window.date_filter = date;
  }
});
new Workspace();
Backbone.history.start({pushState: true});
});
