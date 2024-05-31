import logo from "/assets/images/Logo/logo.png";
import "./Header.css";
import { Col, Container, Row } from "react-bootstrap";

import "primeicons/primeicons.css";
import BasicButton from "../Button/myButton";
import { routes } from "../../routes";
import { Link } from "react-router-dom";
import OtherSearch from "../searchBar/searchBar";
import SearchBar from "../searchBar/searchBar";
import { logout, selectUser } from "../../redux/features/counterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container fluid className="Header" id="header">
      <Row className="Top-header">
        <Col xs={4} className="Header-left">
          <div className="Header-left-component">
            <Link to={routes.adminDiamond}>
              {" "}
              <p>Vào Trang admin</p>
            </Link>
          </div>
          <div className="Header-left-component">
            <i className="pi pi-phone"></i>
            <p>1800 1168</p>
          </div>
          <div className="Header-left-component">
            <i className="pi pi-building"></i>
            <p>HỆ THỐNG SHOWROOM</p>
          </div>
          <div className="Header-left-component">
            <i className="pi pi-map"></i>
            <p>HỆ THỐNG PHÂN PHỐI</p>
          </div>
        </Col>
        <Col xs={4} className="Header-logo">
          <Link to={routes.home}>
            <img src={logo} alt="" />
          </Link>
        </Col>
        <Col xs={2} className="Header-search">
          <SearchBar
            placeholder={"Tìm Kiếm Sản Phẩm"}
            icon={"pi pi-search"}
          ></SearchBar>
        </Col>
        {user ? (
          <Col xs={2} className="Header-login">
            <Link to={routes.profile}>
              {/* <button>Đăng nhập</button> */}
              <p>Welcome {user.email}</p>
            </Link>
            <Link to={routes.login}>
              {/* <button>Đăng ký</button> */}
              <BasicButton
                text={"Đăng Xuất"}
                icon={"pi pi-sign-in"}
                onClick={handleLogout}
              ></BasicButton>
            </Link>
          </Col>
        ) : (
          <Col xs={2} className="Header-login">
            <Link to={routes.login}>
              {" "}
              <BasicButton text={"Đăng nhập"} icon={"pi pi-user"}></BasicButton>
            </Link>
            <Link to={routes.register}>
              {/* <button>Đăng ký</button> */}
              <BasicButton
                text={"Đăng ký"}
                icon={"pi pi-sign-in"}
              ></BasicButton>
            </Link>
          </Col>
        )}
      </Row>

      <Row className="Bottom-header">
        <Col className="Header-navigation">
          <Link to={routes.about}>Giới Thiệu</Link>
        </Col>
        <Col className="Header-navigation">
          <Link to={routes.bst}>Bộ Sưu Tập</Link>
        </Col>
        <Col className="Header-navigation">
          <Link to="">Sản Phẩm Về Kim Cương</Link>
        </Col>
        <Col className="Header-navigation">
          <Link to={routes.size}>Hướng Dẫn Đo Ni</Link>
        </Col>
        <Col className="Header-navigation">
          <Link to={routes.blog}>Kiến Thức</Link>
        </Col>
        <Col className="Header-navigation">
          <Link to="">Bảng Giá Kim Cương</Link>
        </Col>
        <Col className="Header-navigation">
          <Link to={routes.faq}>Câu Hỏi Thường Gặp</Link>
        </Col>
      </Row>
    </Container>
  );
}
