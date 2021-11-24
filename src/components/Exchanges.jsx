import React from 'react';
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';

import { Row, Col, Collapse, Typography, Avatar } from 'antd';
import Loader from './Loader';

import { useGetCryptoExchangesQuery } from '../services/cryptoApi';

const { Panel } = Collapse;
const { Text } = Typography;

const Exchanges = () => {
    const { data, isFetching } = useGetCryptoExchangesQuery();
    if (isFetching) return <Loader></Loader>;

    const exchangesList = data?.data?.exchanges;

    return (
        <div>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row>
                {exchangesList.map((exchange) => (
                    <Col span={24}>
                        <Collapse>
                            <Panel
                                key={exchange.id}
                                showArrow={false}
                                accordion={true}
                                header={
                                    <Row key={exchange.id}>
                                        <Col span={6}>
                                            <Text>
                                                <strong>{exchange.rank}.</strong>
                                            </Text>
                                            <Avatar className='exchange-image' src={exchange.iconUrl} />
                                            <Text>
                                                <strong>{exchange.name}</strong>
                                            </Text>
                                        </Col>
                                        <Col span={6}>${millify(exchange.volume)}</Col>
                                        <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                        <Col span={6}>{millify(exchange.marketShare)}%</Col>
                                    </Row>
                                }
                            >
                                {HTMLReactParser(exchange.description || '')}
                            </Panel>
                        </Collapse>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Exchanges;
