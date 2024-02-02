import { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { getOrders } from '../../service/dodeliver-api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import Form from 'react-bootstrap/Form';
import "./styles.scss"
import moment from 'moment';

export default function Orders() {

    const previous = <FontAwesomeIcon icon={faArrowLeft} size="2x" color="#9582ab" />
    const next = <FontAwesomeIcon icon={faArrowRight} size="2x" color="#9582ab" />
    const search = <FontAwesomeIcon icon={faSearch} size="1x" />

    const [data, setData] = useState([]);
    const itensPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);


    const [formFilters, setFormFilters] = useState({
        order: '',
        client: '',
        date_initial: '',
        date_final: ''
    });

    async function filterTable() {
        reqOrders(currentPage)
    }

    async function reqOrders(limit: number) {
        const result = await getOrders({
            order_id: formFilters.order,
            user_name: formFilters.client,
            date_initial: formFilters.date_initial,
            date_final: formFilters.date_final,
            offset: limit,
            limit: itensPerPage
        })

        if (result.status === 200) {
            setData(result.records)
        }
    }

    async function handleNextPage() {
        const limitPage = currentPage + itensPerPage;
        setCurrentPage(currentPage + itensPerPage);
        await reqOrders(limitPage)
    }

    async function handlePreviousPage() {
        const limitPage = currentPage - itensPerPage;
        setCurrentPage(currentPage - itensPerPage);
        if (limitPage === 0) {
            setCurrentPage(limitPage)
        }
        await reqOrders(limitPage)
    }


    useEffect(() => {
        reqOrders(0)
    }, [])

    return (
        <Container className='mt-5'>

            <h2>Lista de pedidos</h2>

            <Row className='mb-3 mt-5'>

                <Col className='mb-2' md={2}>
                    <Form.Control aria-label="pedido" placeholder='Id pedido' onChange={(e) => setFormFilters({
                        ...formFilters,
                        order: e.target.value
                    })} value={formFilters.order} />
                </Col>
                <Col className='mb-2' md={3}>
                    <Form.Control aria-label="cliente" placeholder='Nome cliente' onChange={(e) => setFormFilters({
                        ...formFilters,
                        client: e.target.value
                    })} value={formFilters.client} />
                </Col>
                <Col className='mb-2' md={3}>
                    <Form.Control aria-label="date_initial" type="date" onChange={(e) => setFormFilters({
                        ...formFilters,
                        date_initial: e.target.value
                    })} value={formFilters.date_initial} />
                </Col>
                <Col className='mb-2' md={3}>
                    <Form.Control aria-label="date_final" type="date" onChange={(e) => setFormFilters({
                        ...formFilters,
                        date_final: e.target.value
                    })} value={formFilters.date_final} />
                </Col>
                <Col md={1} className="justify-content-end d-md-block d-flex">
                    <Button onClick={filterTable} className='bg-dark'>{search}</Button>
                </Col>

            </Row>

            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Id Pedido</th>
                        <th>Cliente</th>
                        <th>Data</th>
                        <th>Produtos</th>
                        <th>Valor total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((orderByUser: any) => (

                        <>
                            {
                                orderByUser.orders.map((orders: any) => (

                                    <tr>
                                        <td>{orders.order_id}</td>
                                        <td>{orderByUser.name}</td>
                                        <td>{moment(orders.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                                        {/* <td>{orders.date}</td> */}

                                        <td>

                                            <Row>
                                                <Col className='fw-bold'>Id Produto</Col>
                                                <Col className='fw-bold'>Valor</Col>
                                            </Row>

                                            {
                                                orders.products.map((products: any) => (
                                                    <>
                                                        <Row>
                                                            <Col className='mb-2'>{products.product_id}</Col>
                                                            <Col>R$ {products.value}</Col>
                                                        </Row>
                                                    </>
                                                ))
                                            }
                                        </td>
                                        <td>R$ {orders.total}</td>
                                    </tr>

                                ))
                            }
                        </>

                    ))}

                </tbody>
            </Table>


            <Row>

                <div className="mt-4 mb-5 d-flex justify-content-center align-items-center paginator">
                    <div className="cursor me-4" onClick={handlePreviousPage}>
                        {previous}
                    </div>
                    <div className="cursor ms-4" onClick={handleNextPage}>
                        {next}
                    </div>
                </div>

            </Row>

        </Container>
    )
}