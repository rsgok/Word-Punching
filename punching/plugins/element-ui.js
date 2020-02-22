import Vue from 'vue'
import { Row, Col, Input, Pagination, Button, Switch, Timeline, TimelineItem, Tabs, TabPane, Table, TableColumn, Dropdown, DropdownMenu, DropdownItem, Tag, Progress, Card, Link, Notification, Breadcrumb, BreadcrumbItem, Message } from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tag);
Vue.use(Progress);
Vue.use(Card);
Vue.use(Link);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(Switch);

Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
