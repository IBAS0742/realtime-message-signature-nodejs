/**
 * Created by sunbing on 17-5-26.
 */

var formMsg = (function(common) {
    var APPID = global.appSetting.LEANCLOUD_APP_ID;
    var MASTER_KEY = global.appSetting.LEANCLOUD_APP_MASTER_KEY;

    var sign = function(form,res) {
        if (form.type_ && form.client_id) {
            var set_ = global.fieldsSetting[form.type_];
            var msg = [APPID, form.client_id];
            var aft = [];
            for (var i = 0;i < set_.length;i++) {
                if (set_[i].name_) {
                    var t_ = '';
                    if (set_[i].type_ == 'array') {
                        if (form[set_[i].name_].length) {
                            t_ = form[set_[i].name_].sort().join(':');
                        } else {
                            t_ = '';
                        }
                    } else {
                        t_ = form[set_[i].name_];
                    }
                    if (set_[i].method_ == 'before') {
                        msg.push(t_);
                    } else {
                        aft.push(t_);
                    }
                } else {
                    msg.push('');
                }
            }
            var ts = parseInt(new Date().getTime() / 1000);
            var nonce = common.getNonce(5);
            msg.push(ts);
            msg.push(nonce);
            msg.concat(aft);
            msg = msg.join(':');
            var sig = common.sign(msg,MASTER_KEY);
            //tar = {'nonce': nonce, 'timestamp': ts, 'signature': sig, 'msg': msg};
            res.set({'Access-Control-Allow-Origin': res.get('Origin') || '*'})
                .json({'nonce': nonce, 'timestamp': ts, 'signature': sig, 'msg': msg});
        } else {
            res.json({});
        }
    };
    return {
        signFn : sign
    }
});//(common);

exports.formMsg = formMsg;