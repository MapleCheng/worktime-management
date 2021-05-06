import moment from 'moment';

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}


export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  // let routes = Object.keys(routerData).filter(
  //   routePath => routePath.indexOf(path) === 0 && routePath !== path
  // );

  let routes = Object.keys(routerData);
  routes.splice(0, 2);
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  // const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = routes.map(item => {
    // const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact: true,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

export const mergeDatetime = (date, time) => {
  return `${moment(date).format('YYYY-MM-DD')} ${moment(time).format('HH:mm:00')}`
}


export const GETurl = (params) => {
  let results = "";
  for(let item of Object.keys(params)) {
    results += (params[item] || "") !== "" ? `&${item}=${params[item]}` : "";
  }
  return results;
}