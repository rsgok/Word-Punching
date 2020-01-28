import Vue from 'vue'
import { Row, Col, Input, Pagination, Button, Table, TableColumn, Tag, Progress, Card, Link, Notification, Breadcrumb, BreadcrumbItem } from 'element-ui'
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
Vue.use(Notification);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);

Vue.prototype.$notify = Notification;
