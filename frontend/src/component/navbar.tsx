// import "./navbar.css";
// import Logo from "../../src/assets/logo copy.png";
// import { Link } from "react-router-dom";


// const Navbar = () => {
//   return (
//     <div className='navbar'>
//       <img src={Logo} className='logo-navbar' alt='Course Logo' />
//       <div className='right-section'>
//         <div className='links'>
//           <div className="navbar-search">
//             <input type="text" placeholder="search"/>
//           </div>
//             <Link to='/Login'>
//               <button className="button-login-navbar">LOG IN</button>
//             </Link>
//             <Link to='/SignupPage'>
//               <button className="button-sign-up">SIGN UP</button>
//             </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;




import profilepic from "../assets/profilepic.jpg";
import Logo from "../assets/logonew.png";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import { message, Avatar } from "antd";
import { MemberInterface } from '../interfaces/Member';
import {GetMemberById} from '../services/http/index'
import { UserOutlined } from '@ant-design/icons';


const Navbar = () => {
    const [uid , setUid] = useState<number | null>(Number(localStorage.getItem("id")))
    const [messageApi, contextHolder] = message.useMessage();
    const [users, setUsers] = useState<MemberInterface | null>(null);

    const GetMemberid = async (user_id:number) => {

        let res = await GetMemberById(user_id);
        
        if (res.status == 200) {
    
          setUsers(res.data);
    
        } else {
    
    
          messageApi.open({
    
            type: "error",
    
            content: res.data.error,
    
          });
    
        }
    
      };
    
      useEffect(() => {
        setUid(Number(localStorage.getItem("id")))
        console.log(uid);
        GetMemberid(uid); // ดึงข้อมูลผู้ใช้เมื่อหน้าโหลด
      }, []);

    // State to manage the sidebar collapse
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    // Toggle sidebar function
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleToLogin = () => {
    navigate('/Login'); // Navigate to ApplyToSeller page
    };

    const handleToSignup = () => {
      navigate('/SignupPage'); // Navigate to ApplyToSeller page
    };

    return (
        <html lang="en" dir="ltr">
        {contextHolder}
        <head>
            <meta charSet="utf-8"></meta>
            <title>Sidebar Dashboard Template with Sub Menu</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"></link>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/brands.min.css" charSet="utf-8"></script>
        </head>
        <body>
            <div className={`wrapper ${isCollapsed ? 'collapse' : ''}`}>
                <div className="header">
                    <div className="header-menu">
                        <div className="title">
                            <img src={Logo} className="navlogo" alt="logo" />
                            SongThor <span>SUT</span> </div>
                        <div className="sidebar-btn" onClick={toggleSidebar}>
                            <i className="fa-solid fa-bars"></i>
                        </div>

                        <ul>
                            <li>
                                <div className="navbar-search">
                                <input
                                      type="text"
                                      placeholder="ค้นหา"
                                    //   value={Title}
                                    //   onChange={(e) => setSearchTitle(e.target.value)} // อัปเดตคำค้นหา
                                    //   onKeyPress={handleSearch} // เรียกใช้ฟังก์ชันเมื่อกด Enter
                                    />
                                </div>
                            </li>
                            <li><a href="#"><i className="fa-solid fa-search"> </i> </a></li>
                            <li>
                                <button className="button-createproduct" onClick={handleToLogin} >LOG IN</button>
                            </li>

                            <li>
                              <button className="button-createproduct" onClick={handleToSignup} >SIGN UP</button>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="siderbar"> 
                    <div className="sidebar-menu">
                        <center className="profile"> 
                            <Avatar size={150} src={users?.ProfilePic || undefined} icon={!users?.ProfilePic && <UserOutlined />} /> 
                        </center>
                        <center>
                            <label className="username">{users?.Username}</label>
                        </center>
                        <li className="item">
                            <a href="#" className="menu-btn"> 
                                <i className="fas fa-house"></i> <span>Home</span>
                            </a>
                        </li>
                        <li className="item" id="profile"> 
                            <a href="#profile" className="menu-btn">
                                <i className="fas fa-user-circle"> </i><span>Profile <i className="fas fa-chevron-down drop-down"></i></span>
                            </a>
                            <div className="sub-menu">
                                <a href="#"> <i className="fas fa-bag-shopping"></i><span>คำสั่งซื้อของฉัน</span></a>
                                <a href="#"> <i className="fas fa-star"></i><span>MyReview</span></a>
                            </div>
                        </li>

                        <li className="item" id="messages"> 
                            <a href="#messages" className="menu-btn">
                                <i className="fas fa-envelope"> </i><span>Messages <i className="fas fa-chevron-down drop-down"></i></span>
                            </a>
                            <div className="sub-menu">
                                <a href="#"> <i className="fas fa-envelope"></i><span>ChatBuyer</span></a>
                                <a href="#"> <i className="fas fa-envelope"></i><span>ChatSeller</span></a>
                            </div>
                        </li>

                        <li className="item" id="shop"> 
                            <a href="#shop" className="menu-btn">
                                <i className="fas fa-shop"> </i><span>Market <i className="fas fa-chevron-down drop-down"></i></span>
                            </a>
                            <div className="sub-menu">
                                <a href="#"> <i className="fas fa-cubes"></i><span>MyOrder</span></a>
                                <a href="#"> <i className="fas fa-trophy"></i><span>Myscore</span></a>
                            </div>
                        </li>

                    </div>
                </div>
                <div className="main-container"></div>
            </div>
        </body>
        </html>
    );
};

export default Navbar;






