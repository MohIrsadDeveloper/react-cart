import React from 'react'
import { Badge, Button, Container, Dropdown, Form, FormControl, Navbar } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartState } from '../Context/Context'

const Header = () => {

 const {state : { cart }, dispatch} = CartState() 

  return (
    <Navbar bg="light" expand="md">
  <Container fluid>
    <Navbar.Brand href="/">Shopping</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      
      <Form className="d-flex ms-auto">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        {/* <Button variant="outline-success">Search</Button> */}

        <Dropdown>
            <Dropdown.Toggle variant='success'>
                <FaShoppingCart color='white' fontSize="25px" />
                <Badge bg="success">{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{minWidth : 370}}>
              {
                cart.length > 0 ? (
                  <>
                  {
                    cart.map((prod) => (
                      <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>₹ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                    ))
                  }
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                  </>
                ) : (
                  <span style={{padding : 10}}>Cart is Empty!</span>
                )
              }
            </Dropdown.Menu>
        </Dropdown>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}
export default Header