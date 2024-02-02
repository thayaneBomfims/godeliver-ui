import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table, Toast } from "react-bootstrap";
import { getImports, postImportOrder } from "../../service/dodeliver-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import moment from "moment";
import AlertToast from "../../components/alertToast";

export default function Import() {

    const search = <FontAwesomeIcon icon={faSearch} size="1x" />
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const [formFilters, setFormFilters] = useState<any>({
        id: '',
    });

    async function importOrder(event: any) {

        const result = await postImportOrder(
            'order',
            event.target.files[0]
        )

        if (result.status === 200) {
            setData([]);
            reqImports()

            AlertToast(
                result.message,
                'success'
            )
        } else {
            AlertToast(
                result.message,
                'error'
            )
        }

    }

    async function reqImports() {

        const result = await getImports({
            id: formFilters.id
        })

        if (result.status === 200) {
            setData(result.records)
        }
    }

    async function filterTable() {
        reqImports()
    }

    useEffect(() => {
        reqImports()
    }, [])


    return (
        <Container className='mt-5'>

            <h2>Importação de pedidos</h2>

            <Row className='mt-4'>
                <Col>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Selecione um arquivo .TXT para importar</Form.Label>
                        <Form.Control type="file" onChange={importOrder} />
                    </Form.Group>
                </Col>
            </Row>

            <h2 className='mt-4 mb-3'>Lista de importações</h2>


            <Row className='mb-3 mt-5'>

                <Col className='mb-2' md={6}>
                    <Form.Control aria-label="imports" placeholder='Id importação' onChange={(e) => setFormFilters({
                        ...formFilters,
                        id: e.target.value
                    })} value={formFilters.id} />
                </Col>
                <Col md={1} className="justify-content-end d-md-block d-flex">
                    <Button onClick={filterTable} className='bg-dark'>{search}</Button>
                </Col>

            </Row>


            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Id Importação</th>
                        <th>Finalizado</th>
                        <th>Data de início</th>
                        <th>Data de finalização</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((importItem: any) => (
                            <tr>

                                <td>{importItem.id}</td>
                                <td>{importItem.finished ? 'Sim' : 'Não'}</td>
                                <td>{moment(importItem.createdAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY HH:mm')}</td>
                                <td>{importItem.finishedAt && moment(importItem.finishedAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY HH:mm')}</td>
                            </tr>

                        ))
                    }

                </tbody>
            </Table>

        </Container>
    )
}