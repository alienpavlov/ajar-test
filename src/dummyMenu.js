export default {
  'data': [
    {
      id: 1,
      title: "Menu item 1",
      url: "/page1",
      visible: true,
      subItems: []
    }, {
      id: 2,
      title: "Menu item 2 (moderator)",
      url: "/page2",
      visible: true,
      isModerator: true,
      subItems: []
    }, {
      id: 3,
      title: "Dropdown item",
      visible: true,
      subItems: [{
        id: 4,
        title: "Sub menu item 3",
        url: "/page3",
        visible: true,
      }, {
        id: 5,
        title: "Sub menu item 4",
        url: "/page4",
        visible: true,
      }]
    }, {
      id: 6,
      title: "Menu item 5 (admin)",
      url: "/page5",
      visible: true,
      isAdmin: true,
      subItems: []
    },
    {
      id: 7,
      title: "Menu item 6",
      url: "/page6",
      visible: false,
      subItems: []
    },
    {
      id: 8,
      title: "Dropdown item",
      visible: true,
      subItems: [{
        id: 9,
        title: "Sub menu item 7 (admin)",
        url: "/page7",
        visible: true,
        isAdmin: true
      }, {
        id: 10,
        title: "Sub menu item 8",
        url: "/page8",
        visible: true,
      }, {
        id: 11,
        title: "Sub menu item 9",
        url: "/page9",
        visible: false,
      }]
    }
  ]
};