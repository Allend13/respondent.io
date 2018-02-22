import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Button, Row, Col, Layout } from 'antd';
import moment from 'moment';
import qs from 'qs';
import { UsersSearch } from '../Users';
import { apiCall } from '../../actions';
import { methods, user, endpoints } from '../../constants';

const {  Content, Sider } = Layout;

export class UsersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      filters: {
        location: [],
        jobTitle: [],
        industry: [],
      }
    };
  }

  static propTypes = {
    users: PropTypes.array,
    isFetching: PropTypes.bool,
    isReady: PropTypes.bool
  };
  static defaultProps = {
    users: [],
    isFetching: false,
    isReady: false
  };

  componentDidMount() {
    this.props.apiCall(methods.get, endpoints.user.index, user.index, {});
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleAddFilter = (name, value) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [name]: value
      }
    });
  };

  sorter = (a, b, field) => {
    if (a[field].toLowerCase() < b[field].toLowerCase()) return -1;
    if (a[field].toLowerCase() > b[field].toLowerCase()) return 1;
    return 0;
  };

  handleFilterRequest = () => {
    const url = qs.stringify(this.state.filters, { indices: false });
    console.log(qs.parse(url));
    console.log(decodeURI(url));
    this.props.apiCall(methods.get, endpoints.user.filters(url), user.filter, {});
  };

  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => this.sorter(a, b, 'name')
    }, {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => this.sorter(a, b, 'email')
    }, {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      sorter: (a, b) => this.sorter(a, b, 'jobTitle')
    }, {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      sorter: (a, b) => this.sorter(a, b, 'industry')
    }, {
      title: 'Location',
      dataIndex: 'location',
      key: 'location'
    }, {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => this.sorter(a, b, 'createdAt'),
      render: (text, record, index) => moment(text).format('YYYY-DD-MM')
    }];


    const { users, isReady, isFetching } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <Layout>
        <Sider width={250} >
          <UsersSearch 
            request={this.handleFilterRequest} 
            data={users} 
            filters={this.state.filters}
            addFilter={this.handleAddFilter}
          />
        </Sider>

        <Layout>
          <Content style={{ background: '#fff' }}>
            <Table 
              rowKey={record => record.name} 
              rowSelection={rowSelection} 
              columns={columns}
              dataSource={users}
              loading={isFetching}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(state => {
  return {
    users: state.usersList.data,
    isReady: state.usersList.isReady,
    isFetching: state.usersList.isFetching
  };
}, { apiCall })(UsersList);