// 在此处配置全局路由器

// 引入路由器
import VueRouter from "vue-router";

// 引入组件
import HomePage from "../pages/HomePage.vue"
import UserPage from "../pages/UserPage.vue"
import PaintingPage from "../pages/PaintingPage.vue"
import HelpPage from "../pages/HelpPage.vue"
import SettingPage from "../pages/SettingPage.vue"
import LoginRegisterPage from "../pages/LoginRegisterPage.vue"
import HotPage from "../pages/HomePage/HotPage.vue"
import CaricaturePage from "../pages/HomePage/CaricaturePage.vue"
import DailyPage from "../pages/HomePage/DailyPage.vue"
import EventPage from "../pages/HomePage/EventPage.vue"
import MyLikes from "../pages/UserPage/MyLikes.vue"
import MyPublish from "../pages/UserPage/MyPublish.vue"




const router = new VueRouter({
    routes: [
        // 路由重定向
        {
            path: "/",
            redirect: "/HomePage",
        },

        {
            name: "HomePage",
            path: "/HomePage",
            redirect:"/HomePage/HotPage",
            component: HomePage,
            meta: {
                title: "主页",
            },
            children: [
                {
                    name: "HotPage",
                    path: "HotPage",
                    component: HotPage,
                    meta: {
                        title: "热门"
                    }
                },
                {
                    name: "CaricaturePage",
                    path: "CaricaturePage",
                    component: CaricaturePage,
                    meta: {
                        title: "漫画"
                    }
                },
                {
                    name: "DailyPage",
                    path: "DailyPage",
                    component: DailyPage,
                    meta: {
                        title: "日常"
                    }
                },
                {
                    name: "EventPage",
                    path: "EventPage",
                    component: EventPage,
                    meta: {
                        title: "活动"
                    }
                },
            ]
        },

        {
            name: "UserPage",
            path: "/UserPage",
            redirect:"/UserPage/MyPublish",
            component: UserPage,
            meta: {
                title: "用户",
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
            children:[
                {
                    name: "MyLikes",
                    path: "MyLikes",
                    component: MyLikes,
                    meta: {
                        title: "我的喜欢"
                    }
                },
                {
                    name: "MyPublish",
                    path: "MyPublish",
                    component: MyPublish,
                    meta: {
                        title: "我的发布"
                    }
                }
            ]
        },

        {
            name: "PaintingPage",
            path: "/PaintingPage",
            component: PaintingPage,
            meta: {
                title: "涂鸦",
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            }
        },

        {
            name: "HelpPage",
            path: "/HelpPage",
            component: HelpPage,
            meta: {
                title: "帮助",
            }
        },

        {
            name: "SettingPage",
            path: "/SettingPage",
            component: SettingPage,
            meta: {
                title: "设置",
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            }
        },

        {
            name: "LoginRegisterPage",
            path: "/LoginRegisterPage",
            component: LoginRegisterPage,
            meta: {
                title: "登录/注册"
            }
        }
    ],

    // 路由跳转时自动滚动到顶部
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
});

// 全局前置路由守卫，判断是否登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        // console.log(to,from);

        // 如果本地存储中没有token的信息，则跳转到登录页
        if (!sessionStorage.getItem("token") && !localStorage.getItem("token")) {
            alert("请先登录！");
            next({ path: "/LoginRegisterPage" });
        } else {
            // console.log("a",to,from);
            next();
        }
    } else {
        // console.log("b",to,from);
        next();
    }
}),

    // 后置路由守卫
    router.afterEach((to) => {
        // console.log(to,from);

        document.title = to.meta.title || "paintLike";
    })


// 默认暴露
export default router;