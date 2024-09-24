// import { useNavigate } from 'react-router-dom';
// import "./navbar.css";
// import Logo from "../assets/logo.png";
// import Chat from "../assets/chat.png";
// import list from "../assets/list.png";
// import market from "../assets/shopping-cart.png";
// import bell from "../assets/bell.png";
// import backarrow from "../assets/back-arrow.png";

// const Navbar = () => {
//   const navigate = useNavigate(); // Hook for navigation

//   const handleHomeSeller = () => {
//     navigate('/HomeSeller'); 
//   };

//   const handleCreateProduct = () => {
//     navigate('/createproducts'); 
//   };

//   return (
//     <div className='navbar'>
//             <img
//               src={Logo}
//               alt="Course Logo"
//               style={{
//                 width: "200px",
//                 marginRight: "30px",
//                 marginTop:"0"
//               }}
//             />
//               <div className='right-section'>
//                 <div className='links'>
//                 <button className="button-createproduct" >
//                     รีวิว
//                   </button>
//                   <button className="button-createproduct" >
//                     คะแนนร้านค้า
//                   </button>
//                   <button className="button-createproduct" onClick={handleCreateProduct}>
//                     เพิ่มสินค้า
//                   </button>

//                 <div className='imgbox'>
//                     <img src={Chat} alt="Chat"/>
//                     <img src={market} alt="market"/>
//                     <img src={list} alt="list"/>
//                     <img src={bell} alt="bell"/>
//                     <img src={backarrow} alt="back" onClick={handleHomeSeller}/>
//                 </div>

//        </div>
//      </div>
//     </div>
//   );
// }

// export default Navbar;






import { useNavigate } from "react-router-dom";
import profilepic from "../../src/assets/profilepic.jpg";
import Logo from "../assets/logonew.png";
import "./navbarProducts.css";
import { useState, useEffect} from "react";
import { message, Avatar } from "antd";
import { MemberInterface } from '../interfaces/Member';
import {GetMemberById} from '../services/http/index'
import { UserOutlined } from '@ant-design/icons';

const Navbarproductsber = () => {
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

    const Logout = () => {
        localStorage.clear();
        messageApi.success("Logout successful");
        setTimeout(() => {
          location.href = "/";
        }, 2000);
    };

    const handleToHoproductsember = () => {
      navigate('/HomeSeller'); // Navigate to ApplyToSeller page
      };

    const handleToProfile = () => {
      navigate('/Profile'); // Navigate to ApplyToSeller page
      };

    const handleToOrder = () => {
      navigate('/Card'); // Navigate to ApplyToSeller page
      };

    const handleToMyReview = () => {
      navigate('/Review'); // Navigate to ApplyToSeller page
      };

    const handleToChatBuyer = () => {
      navigate('/ChatBuyer'); // Navigate to ApplyToSeller page
      };

    // const handleToChatSeller = () => {
    //   navigate('/ChatSeller'); // Navigate to ApplyToSeller page
    //   };
    // const handleToMyOrder = () => {
    //   navigate('/MyOrder'); // Navigate to ApplyToSeller page
    // };


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
            <div className={`wrapperproducts ${isCollapsed ? 'collapseproducts' : ''}`}>
                <div className="headerproducts">
                    <div className="header-menuproducts">
                        <div className="titleproducts">
                            <img src={Logo} className="navproductslogo" alt="logo" />
                            SongThor <span>SUT</span> </div>
                        <div className="sidebar-btnproducts" onClick={toggleSidebar}>
                            <i className="fa-solid fa-bars"></i>
                        </div>

                        <ul>


                            <li>
                              <button className="button-createproductproducts" onClick={handleToApplyToSeller}>รีวิว</button>
                            </li>
                            
                            <li>
                              <button className="button-createproductproducts" onClick={handleToApplyToSeller}>คะแนนร้านค้า</button>
                            </li>
                            
                            <li>
                              <button className="button-createproductproducts" onClick={handleToApplyToSeller}>เพิ่มสินค้า</button>
                            </li>

                            <li><a onClick={handleToOrder}><i className="fa-solid fa-cart-shopping"> </i> </a></li>
                            <li><a ><i className="fa-solid fa-power-off" onClick={Logout}> </i> </a></li>
                        </ul>
                    </div>
                </div>
                <div className="siderbarproducts"> 
                    <div className="sidebar-menuproducts">
                        <center className="profileproducts"> 
                            <Avatar size={250} src={users?.ProfilePic || undefined} icon={!users?.ProfilePic && <UserOutlined />} />  
                        </center>
                        <center>
                            <label className="username">{users?.Username}</label>
                        </center>
                        <li className="itemproducts" onClick={handleToHoproductsember}>
                            <a href="#" className="menu-btnproducts" > 
                                <i className="fas fa-house" ></i> <span>Home</span>
                            </a>
                        </li>
                        <li className="itemproducts" id="profile"> 
                            <a href="#profile" className="menu-btnproducts">
                                <i className="fas fa-user-circle"> </i><span>Profile <i className="fas fa-chevron-down drop-downproducts"></i></span>
                            </a>
                            <div className="sub-menuproducts">
                                <a onClick={handleToProfile}> <i className="fas fa-user" ></i><span>MyProfile</span></a>
                                <a onClick={handleToOrder}> <i className="fas fa-bag-shopping"></i><span>คำสั่งซื้อของฉัน</span></a>
                                <a onClick={handleToMyReview}> <i className="fas fa-star"></i><span>MyReview</span></a>
                            </div>
                        </li>

                        <li className="itemproducts" id="messages"> 
                            <a href="#messages" className="menu-btnproducts">
                                <i className="fas fa-envelope"> </i><span>Messages <i className="fas fa-chevron-down drop-downproducts"></i></span>
                            </a>
                            <div className="sub-menuproducts">
                                <a onClick={handleToChatBuyer}> <i className="fas fa-envelope"></i><span>ChatBuyer</span></a>
                                <a > <i className="fas fa-envelope"></i><span>ChatSeller</span></a>
                            </div>
                        </li>

                        <li className="itemproducts" id="shop"> 
                            <a href="#shop" className="menu-btnproducts">
                                <i className="fas fa-shop"> </i><span>Market <i className="fas fa-chevron-down drop-downproducts"></i></span>
                            </a>
                            <div className="sub-menuproducts">
                                <a > <i className="fas fa-cubes"></i><span>MyOrder</span></a>
                                <a > <i className="fas fa-trophy"></i><span>Myscore</span></a>
                            </div>
                        </li>

                    </div>
                </div>
                <div className="main-containerproducts"></div>
            </div>
        </body>
        </html>
    );
};

export default Navbarproductsber;


