import React, { useState, useEffect } from 'react';
import { Pie, Bar, Column } from '@ant-design/plots';
import { Flex } from 'antd';
import { useParams } from 'react-router-dom';
import { getCardByColumnAPI, getCardByStatusAPI, getCardByUserAPI } from '../../../../services/Card/Card.service';

const DashBoard: React.FC = () => {
    const [cardColumn, setCardColumn] = useState<any[]>([]);
    const [cardUser, setCardUser] = useState<any[]>([]);
    const [cardStatus, setCardStatus] = useState<any[]>([]);

    const { id } = useParams();

    const fetchData = async () => {
        const card_user = await getCardByUserAPI(id);
        const card_column = await getCardByColumnAPI(id);
        const card_status = await getCardByStatusAPI(id);

        setTimeout(() => {
            setCardUser(card_user);
            setCardColumn(card_column)
            setCardStatus(card_status)
        }, 500);
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const configPie = {
        data: cardStatus,
        angleField: 'Số thẻ',
        colorField: 'card_status',
        label: {
            type: 'outer',
            content: '{card_status}',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            position: 'right',
            itemSpacing: 5,
        },
    };

    const configBar = {
        data: cardColumn,
        xField: 'column_name',
        yField: 'card_number',
        colorField: 'column_name',
        state: {
            unselected: { opacity: 0.5 },
            selected: { lineWidth: 3, stroke: 'red' },
        },
        interactions: [
            { type: 'element-selected' },
            { type: 'element-active' },
        ],
    };

    const configColumn = {
        data: cardUser,
        xField: 'user_name',
        yField: 'card_number',
        colorField: 'user_name',
        legend: {
            position: 'top',
        },
    };

    return (
        <>
            <div style={{
                height: "85.5vh", width: "100%",
                backgroundColor: "white", borderRadius: "5px",
                padding: "5px", marginTop: "10px", marginBottom: "10px",
                overflowY: "auto", overflowX: "hidden"
            }}>
                <Flex>
                    <Pie {...configPie} title={"Thống kê trạng thái các thẻ"} />
                    <Bar {...configBar} title={"Số thẻ mỗi danh sách"} />
                </Flex>
                <Flex>
                    <Column {...configColumn} title={"Số thẻ mỗi thành viên"} />
                </Flex>
            </div>
        </>
    );
};

export default DashBoard;
