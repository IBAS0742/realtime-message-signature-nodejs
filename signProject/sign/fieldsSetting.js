/**
 * Created by sunbing on 17-5-26.
 */

global.fieldsSetting = {
    'connect' : [{
        name_ : '',
        method_ : 'before',
        type_ : 'string'
    }],
    'oprateConversation' : [{
        name_ : 'conv_id',
        method_ : 'before',
        type_ : 'string'
    },{
        name_ : 'members',
        method_ : 'before',
        type_ : 'string'
    },{
        name_ : 'action',
        method_ : 'after',
        type_ : 'string'
    }],
    'startConversation' : [{
        name_ : 'members',
        method_ : 'before',
        type_ : 'string'
    }],
    'queryMessage' : [{
        name_ : 'conv_id',
        method_ : 'before',
        type_ : 'string'
    }]
};