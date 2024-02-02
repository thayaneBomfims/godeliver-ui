import { api } from '../index'
import moment from 'moment';

async function getOrders(headers: {
    order_id?: string,
    user_name?: string,
    date_initial?: string,
    date_final?: string,
    offset: number,
    limit: number
}) {

    try {

        let headersUpdated: any = {
            Authorization: import.meta.env.VITE_APP_TOKEN,
            offset: headers.offset,
            limit: headers.limit
        }

        headers.order_id !== '' && (headersUpdated.order_id = Number(headers.order_id))
        headers.user_name !== '' && (headersUpdated.user_name = headers.user_name)
        headers.date_initial !== '' && (headersUpdated.date_initial = moment(headers.date_initial, 'YYYYMMDD').format('YYYY-MM-DD'))
        headers.date_final !== '' && (headersUpdated.date_final = moment(headers.date_final, 'YYYYMMDD').format('YYYY-MM-DD'))

        const orders = await api.get(`/order`, {
            headers: headersUpdated
        });

        return orders.data;
    } catch (error: any) {
        return error
    }
}


async function getImports(headers: {
    id?: string
}) {

    try {

        let headersUpdated: any = {
            Authorization: import.meta.env.VITE_APP_TOKEN,
        }

        headers.id !== '' && (headersUpdated.id = headers.id)

        const imports = await api.get(`/import`, {
            headers: headersUpdated
        });

        return imports.data;
    } catch (error: any) {
        return error
    }
}

async function postImportOrder(
    type: string,
    file: File
) {

    const formData = new FormData();
    formData.append('file', file);

    try {

        const orderImport = await api.post(`/import/file/`, formData, {
            headers: {
                Authorization: import.meta.env.VITE_APP_TOKEN,
                type: type
            }
        });

        return orderImport.data;
    } catch (error: any) {
        return error
    }
}


export { getOrders, getImports, postImportOrder }