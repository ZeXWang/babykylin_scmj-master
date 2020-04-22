"use strict";
cc._RF.push(module, '7f553G0boRH6KrTE7wACaXx', 'ReConnect');
// scripts/components/ReConnect.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _lblTip: null,
        _lastPing: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;

        var fnTestServerOn = function fnTestServerOn() {
            cc.vv.net.test(function (ret) {
                if (ret) {
                    cc.vv.gameNetMgr.reset();
                    //cc.director.loadScene('hall');
                    var roomId = cc.vv.userMgr.oldRoomId;
                    if (roomId != null) {
                        cc.vv.userMgr.oldRoomId = null;
                        cc.vv.userMgr.enterRoom(roomId, function (ret) {
                            if (ret.errcode != 0) {
                                cc.vv.gameNetMgr.roomId = null;
                                cc.director.loadScene('hall');
                            }
                        });
                    }
                } else {
                    setTimeout(fnTestServerOn, 3000);
                }
            });
        };

        var fn = function fn(data) {
            self.node.off('disconnect', fn);
            cc.vv.wc.show("正在重连...");
            fnTestServerOn();
        };
        console.log("adasfdasdfsdf");

        this.node.on('login_finished', function () {
            cc.vv.wc.hide();
            self.node.on('disconnect', fn);
        });
        this.node.on('disconnect', fn);
    },
    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {}
});

cc._RF.pop();