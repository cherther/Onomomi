Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function() {
        var leaderboard = new Ext.Component({
            title: 'Top 50',
            cls: 'leaderboard',
						iconCls: 'favorites',
            scroll: 'vertical',
						html: '<h2>Top 50 Users</h2>', 
            tpl: [
                '<tpl for=".">',
                    '<div class="tweet">',
                            '<div class="avatar"><img src="{profile_image_url}" /></div;>',
                            '<div class="tweet-content">',
                                '<h2>{from_user}</h2>',
                                '<p>{text}</p>',
                            '</div>',
                    '</div>',
                '</tpl>'
            ]
        });
        var community = new Ext.Component({
            title: 'Friends',
            cls: 'community',
						iconCls: 'team',
            scroll: 'vertical',
						html: '<h2>Friends</h2>', 
            tpl: []
        });
        var myprofile = new Ext.Component({
            title: 'Profile',
            cls: 'myprofile',
            iconCls: 'user',
						scroll: 'vertical',
						html: '<h2>My Profile</h2>', 
            tpl: []
        });
						
				

        var panel = new Ext.TabPanel({
				    fullscreen: true,
            animation: 'slide',
						tabBarPosition: 'bottom',//'top'
						centered: true,
            items: [leaderboard, community, myprofile],
						ui: 'dark'
        });

        var refresh = function() {
            window.location.reload();
        };
				
				
        var tabBar = panel.getTabBar();
        tabBar.addDocked({
            xtype: 'button',
            ui: 'dark',
            iconCls: 'add',
						text: 'Check In',
            dock: 'right',
            stretch: false,
            align: 'center',
            handler: refresh
        });

				
    }
});