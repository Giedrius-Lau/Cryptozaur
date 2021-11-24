import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography;

const { Option } = Select;
const demoImage = '../images/cryptocurrency.png';

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
    const { data } = useGetCryptosQuery(100);

    if (!cryptoNews?.value) return <Loader></Loader>;

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <div className='title-searchbar'>
                        <Title level={2} className='home-title'>
                            Cryptocurrencies
                        </Title>

                        <Select
                            showSearch
                            className='select-news'
                            placeholder='Select a Crypto'
                            optionFilterProp='children'
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value='Cryptocurrency'></Option>
                            {data?.data?.coins.map((coin) => (
                                <Option value={coin.name}>{coin.name}</Option>
                            ))}
                        </Select>
                    </div>
                </Col>
            )}

            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div className='news-image-container'>
                                <Title className='news-title' level={5} style={{ marginRight: '10px' }}>
                                    {news.name}
                                </Title>
                                <img
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                                    alt={news.name}
                                ></img>
                            </div>
                            <p>{news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='Provider'></Avatar>
                                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;
