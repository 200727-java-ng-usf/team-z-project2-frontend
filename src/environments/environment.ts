
export const environment = {
  production: false,
  API_URL: 'http://teamzproject2-env.eba-34mm3jvd.us-east-2.elasticbeanstalk.com'
  //set to your own tomcat or aws beanstalk
  //should coincide with servlets

  //if you get a cross origin html error, add this to your web.xml (if we even will need it):
//   <filter>
//   <filter-name>CorsFilter</filter-name>
//   <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
//   <init-param>
//       <param-name>cors.allowed.origins</param-name>
//       <param-value>*</param-value>
//   </init-param>
//   <init-param>
//       <param-name>cors.allowed.methods</param-name>
//       <param-value>GET,POST,HEAD,OPTIONS,PUT</param-value>
//   </init-param>
// </filter>
// <filter-mapping>
//   <filter-name>CorsFilter</filter-name>
//   <url-pattern>/*</url-pattern>
// </filter-mapping>
};
