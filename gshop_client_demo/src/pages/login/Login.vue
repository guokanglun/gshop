<template>
    <div class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on:longinWay}" @click="longinWay = true">短信登录</a>
                    <a href="javascript:;" :class="{on:!longinWay}" @click="longinWay= false">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <div :class="{on:longinWay}">
                        <section class="login_message">
                            <input type="tel" maxlength="11"  placeholder="手机号" v-model="phone">
                            <button :disabled="!isRight" class="get_verification" :class="{right_phone: isRight}"
                            @click.prevent="getCode"
                            >{{ computedTime>0 ? `已发送${computedTime}s`:'获取验证码' }}</button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on:!longinWay}">
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder="用户名" v-model="name">
                            </section>
                            <section class="login_verification">
                                <input type="tel" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd = !showPwd">
                                    <div class="switch_circle" :class="{right: showPwd}"></div>
                                    <span class="switch_text"> {{ showPwd ? 'abc': '' }} </span>
                                </div>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" ref="captcha" >
                                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                                @click="getCaptcha" ref="captcha"
                                >
                            </section>
                        </section>
                    </div>
                    <button class="login_submit">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <a href="javascript:" class="go_back" @click="$router.back()">
                <i class="iconfont icon-jiantou2"></i>
            </a>
        </div>
        <AlertTip :alertText="alertText" @closeTip="closeTip" v-show="isAlert"/>
    </div>
</template>

<script>
    import AlertTip from "../../components/alertTip/AlertTip";
    import {reqPhoneLogin, reqUserPwdLogin, reqSendCode} from '../../api'
    export default {
        name: "Login",
        components: {
          AlertTip
        },
        data () {
            return {
                longinWay: true,  // true代表短信登录  false代表密码登录
                phone: '',  //  手机号
                computedTime: 0,  // 倒计时
                pwd: '', // 密码
                showPwd: false, // 是否显示密码
                code: '',  // 短信验证码
                name: '',  // 用户名
                captcha: '',  // 图形验证码
                isAlert: false,  // 是否显示弹窗
                alertText: '' // 弹窗内容
            }
        },
        computed: {
            isRight () {
                return /1\d{10}/.test(this.phone)
            }
        },
        methods: {
            // 点击获取短信验证码
            async getCode () {
                if(this.computedTime === 0){
                    this.computedTime = 30;
                    clearInterval(this.timer);
                    this.timer = setInterval(()=>{
                        this.computedTime --;
                        if(this.computedTime <= 0){
                            clearInterval(this.timer);
                            this.computedTime = 0;
                        }
                    }, 1000);
                    // 发送短信验证码
                    const result = await reqSendCode(this.phone);
                    if(result.code === 1){
                        this.showAlert(result.msg);
                        this.computedTime = 0;
                        clearInterval(this.timer)
                    }else{
                        this.showAlert('短信发送成功')
                    }
                }
            },
            // 登录
            async login(){
                if (this.longinWay) {  // 短信登录
                    const {phone, code, isRight} = this;
                    if(!isRight) return this.showAlert('手机号格式不正确');
                    if(!code) return this.showAlert('验证码必须输入');

                    // 发送ajax请求短信登录
                    const result = await reqPhoneLogin(phone, code);
                    if(result.code === 1){
                        this.showAlert(result.msg)
                    } else {
                        // 登录成功
                        this.$store.dispatch('saveUser', result.data);
                        this.$router.replace('/profile')
                    }
                }else{  // 用户名密码登录
                    const {name, pwd, captcha} = this;
                    if(!name) return this.showAlert('请输入用户名');
                    if(!pwd) return this.showAlert('请输入密码');
                    if(!captcha) return this.showAlert('请输入验证码');

                    // 用户名 密码登录
                    const result = await reqUserPwdLogin(name, pwd, captcha);
                    // console.log(name, pwd, captcha);
                    if(result.code === 1){
                        this.showAlert(result.msg);
                        this.getCaptcha()
                    }else{
                        // 登录成功
                        this.$store.dispatch('saveUser', result.data);
                        this.$router.replace('/profile')
                    }

                }
            },
            // 关闭弹窗
            closeTip(){
                this.isAlert = false;
                this.alertText = '';
            },
            // 显示弹窗
            showAlert(alertText){
                this.isAlert = true;
                this.alertText = alertText
            },

            // 获取新的图形验证码
            getCaptcha(){
                this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
            }
        }
    }
</script>

<style scoped lang="stylus">
    .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color #02a774
                    text-align center
                .login_header_title
                    padding-top 40px
                    text-align center
                    >a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color #02a774
                            font-weight 700
                            border-bottom 2px solid #02a774
            .login_content
                >form
                    >div
                        display none
                        &.on
                            display block
                        input
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #ddd
                            border-radius 4px
                            outline 0
                            font 400 14px Arial
                            &:focus
                                border 1px solid #02a774
                        .login_message
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .get_verification
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                border 0
                                color #ccc
                                font-size 14px
                                background transparent
                                &.right_phone
                                    color:black
                        .login_verification
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .switch_button
                                font-size 12px
                                border 1px solid #ddd
                                border-radius 8px
                                transition background-color .3s,border-color .3s
                                padding 0 6px
                                width 30px
                                height 16px
                                line-height 16px
                                color #fff
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                &.off
                                    background #fff
                                    .switch_text
                                        float right
                                        color #ddd
                                &.on
                                    background #02a774
                                >.switch_circle
                                    //transform translateX(27px)
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                                    transition transform .3s
                                    &.right
                                        transform translateX(30px)
                        .login_hint
                            margin-top 12px
                            color #999
                            font-size 14px
                            line-height 20px
                            >a
                                color #02a774
                    .login_submit
                        display block
                        width 100%
                        height 42px
                        margin-top 30px
                        border-radius 4px
                        background #4cd96f
                        color #fff
                        text-align center
                        font-size 16px
                        line-height 42px
                        border 0
                .about_us
                    display block
                    font-size 12px
                    margin-top 20px
                    text-align center
                    color #999
            .go_back
                position absolute
                top 5px
                left 5px
                width 30px
                height 30px
                >.iconfont
                    font-size 20px
                    color #999
</style>
