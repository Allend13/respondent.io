import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, AutoComplete, Collapse, Input, Select } from 'antd';


class UsersSearch extends Component {
  static propTypes = {};
  static defaultProps = {};


  renderOptions = (arr, field) => {
    const Option = Select.Option;
    const list = arr.map(item => {
      return item[field];
    });
    return Array.from(new Set(list)).map((item, i) => {
        return <Option key={i} value={item}>{item}</Option>;
      }
    );
  };

  handleChange = (value, name) => {
    this.props.addFilter(name, value);
  };

  render() {
    const { data, filters, request } = this.props;
    const Search = Input.Search;

    const industry = this.renderOptions(data, 'industry');
    const location = this.renderOptions(data, 'location');
    const jobTitle = this.renderOptions(data, 'jobTitle');
    return (
      <div className='search-block'>
        <div className='search-block__item'>
          <Search
            placeholder='input name'
            onSearch={value => console.log(value)}
          />
        </div>
        <div className='search-block__item'>
          <Select
            mode='tags'
            placeholder='Industry'
            value={filters.industry}
            onChange={(value) => this.handleChange(value, 'industry')}>
            {industry}
          </Select>
        </div>
        <div className='search-block__item'>
          <Select
            mode='tags'
            placeholder='Location'
            value={filters.location}
            onChange={(value) => this.handleChange(value, 'location')}>
            {location}
          </Select>
        </div>
        <div className='search-block__item'>
          <Select
            mode='tags'
            placeholder='Job Title'
            value={filters.jobTitle}
            onChange={(value) => this.handleChange(value, 'jobTitle')}>
            {jobTitle}
          </Select>
        </div>
        <div className='search-block__item'>
          <Button type={'primary'} onClick={request}>Filter</Button>
        </div>
      </div>
    );
  }
}

export default UsersSearch;