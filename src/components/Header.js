import React from 'react'
import { PageHeader } from 'react-bootstrap'
import { Link } from 'react-router'

const Header = () => (
  <nav className="header" >
    <PageHeader>
      测试增删改查
      <small>
        <Link to="/">首页</Link> ，
        <Link to="disk">测试页</Link> ，
        <Link to="test">testPage</Link> 
      </small>
    </PageHeader>
  </nav>
)

export default Header
