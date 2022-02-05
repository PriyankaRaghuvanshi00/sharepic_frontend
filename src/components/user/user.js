export const UserTab = (id, url, name) => {
   return (<div className='usertab' key={id}>
      <img className='useravatar' alt="dp" src={`data:image/png;base64,${url}`}></img>
      <h2>{name}</h2>
   </div>);
}