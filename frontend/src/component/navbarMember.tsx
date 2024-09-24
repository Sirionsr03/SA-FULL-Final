// import { useNavigate } from 'react-router-dom';
// import React, { useState } from 'react'; // เพิ่มการนำเข้า useState
// import "./navbarMember.css";
// import Logo from "../assets/logo.png";
// import list from "../assets/list.png";
// import market from "../assets/shopping-cart.png";
// import bell from "../assets/bell.png";
// import Chat from "../assets/chat.png";


// const NavbarMember = () => {
//   const navigate = useNavigate(); // Hook for navigation
//   const [Title, setSearchTitle] = useState<string>(""); // State สำหรับคำค้นหา

//   const handleApplySeller = () => {
//     navigate('/apply-to-seller'); // Navigate to ApplyToSeller page
//   };

//   // ฟังก์ชันสำหรับจัดการการค้นหา
//   const handleSearch = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && Title.trim()) {
//       navigate(`/search/${Title}`); // นำทางไปยัง path ที่ต้องการ
//     }
//   };

//   const handleCreateProduct = () => {
//     navigate('/Card'); // Navigate to ApplyToSeller page
//   };

//   const handleChatBuyer = () => {
//     navigate('/ChatBuyer'); // Navigate to ApplyToSeller page
//   };

//   return (
//     <div className='navbarmember'>
//       <img
//         src={Logo}
//         alt="Course Logo"
//         style={{
//           width: "200px",
//           marginRight: "20px",
//           marginTop: "0px"
//         }}
//       />
//       <div className='right-sectionmember'>
//         <div className='linksmember'>
//           <div className="search">
//             <input
//               type="text"
//               placeholder="ค้นหา"
//               value={Title}
//               onChange={(e) => setSearchTitle(e.target.value)} // อัปเดตคำค้นหา
//               onKeyPress={handleSearch} // เรียกใช้ฟังก์ชันเมื่อกด Enter
//             />
//           </div>
//           <button className="button-createproductmember" onClick={handleApplySeller}>
//             สร้างการขายสินค้า
//           </button>
//           <div className="box-navbarmember">
//             <img src={market} alt="market" onClick={handleCreateProduct}/>
//             <img src={list} alt="list"/>
//             <img src={bell} alt="bell"/>
//             <img src={Chat} alt="Chat" onClick={handleChatBuyer}/>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NavbarMember;







import { useNavigate } from "react-router-dom";
import Logo from "../assets/logonew.png";
import "./navbarMember.css";
import { useState, useEffect} from "react";
import { message, Avatar } from "antd";
import { MemberInterface } from '../interfaces/Member';
import {GetMemberById} from '../services/http/index'
import { UserOutlined } from '@ant-design/icons';

const NavbarMember = () => {
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

    const handleToHomeMember = () => {
      navigate('/HomeMember'); // Navigate to ApplyToSeller page
      };

    const handleToProfile = () => {
      navigate('/Profile'); // Navigate to ApplyToSeller page
      };

    const handleToProfileEdit = () => {
      navigate('/Profile/ProfileEdit/:id'); // Navigate to ApplyToSeller page
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

    const handleToApplyToSeller = () => {
      navigate('/apply-to-seller'); // Navigate to ApplyToSeller page
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
            <div className={`wrappermem ${isCollapsed ? 'collapsemem' : ''}`}>
                <div className="headermem">
                    <div className="header-menumem">
                        <div className="titlemem">
                            <img src={Logo} className="navmemlogo" alt="logo" />
                            SongThor <span>SUT</span> </div>
                        <div className="sidebar-btnmem" onClick={toggleSidebar}>
                            <i className="fa-solid fa-bars"></i>
                        </div>

                        <ul>
                            <li>
                                <div className="navbar-searchmem">
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
                              <button className="button-createproductmember" onClick={handleToApplyToSeller}>สร้างการขายสินค้า</button>
                            </li>
                            <li><a onClick={handleToOrder}><i className="fa-solid fa-cart-shopping"> </i> </a></li>
                            <li><a ><i className="fa-solid fa-power-off" onClick={Logout}> </i> </a></li>
                        </ul>
                    </div>
                </div>
                <div className="siderbarmem"> 
                    <div className="sidebar-menumem">
                        <center className="profilemem"> 
                            <Avatar size={250} src={users?.ProfilePic || undefined} icon={!users?.ProfilePic && <UserOutlined />} /> 
                        </center>
                        <center>
                            <label className="username">{users?.Username} <i className="fas fa-pen-to-square" onClick={handleToProfileEdit}></i></label>
                        </center>
                        <li className="itemmem" onClick={handleToHomeMember}>
                            <a href="#" className="menu-btnmem" > 
                                <i className="fas fa-house" ></i> <span>Home</span>
                            </a>
                        </li>
                        <li className="itemmem" id="profile"> 
                            <a href="#profile" className="menu-btnmem">
                                <i className="fas fa-user-circle"> </i><span>Profile <i className="fas fa-chevron-down drop-downmem"></i></span>
                            </a>
                            <div className="sub-menumem">
                                <a onClick={handleToProfile}> <i className="fas fa-user" ></i><span>MyProfile</span></a>
                                <a onClick={handleToOrder}> <i className="fas fa-bag-shopping"></i><span>คำสั่งซื้อของฉัน</span></a>
                                <a onClick={handleToMyReview}> <i className="fas fa-star"></i><span>MyReview</span></a>
                            </div>
                        </li>

                        <li className="itemmem" id="messages"> 
                            <a href="#messages" className="menu-btnmem">
                                <i className="fas fa-envelope"> </i><span>Messages <i className="fas fa-chevron-down drop-downmem"></i></span>
                            </a>
                            <div className="sub-menumem">
                                <a onClick={handleToChatBuyer}> <i className="fas fa-envelope"></i><span>ChatBuyer</span></a>
                                <a > <i className="fas fa-envelope"></i><span>ChatSeller</span></a>
                            </div>
                        </li>

                        <li className="itemmem" id="shop"> 
                            <a href="#shop" className="menu-btnmem">
                                <i className="fas fa-shop"> </i><span>Market <i className="fas fa-chevron-down drop-downmem"></i></span>
                            </a>
                            <div className="sub-menumem">
                                <a > <i className="fas fa-cubes"></i><span>MyOrder</span></a>
                                <a > <i className="fas fa-trophy"></i><span>Myscore</span></a>
                            </div>
                        </li>

                    </div>
                </div>
                <div className="main-containermem"></div>
            </div>
        </body>
        </html>
    );
};

export default NavbarMember;
