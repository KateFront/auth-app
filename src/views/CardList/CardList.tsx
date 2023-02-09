import React, { useEffect } from 'react';
import CommonPageWrapper from '../../components/atoms/CommonPageWrapper/CommonPageWrapper';
import { useParams, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getCardsTC, setCurrentPageAC } from '../../store/card-reducer';
import Paginator from '../../components/atoms/Paginator/Paginator';
import MainCardListContainer from './modules/MainCardList/MainCardListContainer';
import { GetCardParams } from '../../api/cards/typesCards';
import styles from './CardList.module.scss';
import Container from '../../components/atoms/Container/Container';

const CardList = () => {
    const dispatch = useAppDispatch();

    const totalCardCount = useAppSelector((state) => state.card.totalCardCount);
    const currentPage = useAppSelector((state) => state.card.currentPage);
    const pageSize = useAppSelector((state) => state.card.pageSize);

    const search = useAppSelector((state) => state.pack.search);

    const { cardId } = useParams();
    console.log(cardId);

    useEffect(() => {
        const params: GetCardParams = {
            pageCount: pageSize,
            page: currentPage,
            cardsPack_id: cardId,
        };
        if (cardId) dispatch(getCardsTC(params));
    }, [cardId, currentPage, pageSize, search]);

    if (!cardId) return <Navigate to={'/cards'} />;

    const onChangeCurrentPage = (newCardPage: number) => {
        dispatch(setCurrentPageAC({ newCardPage }));
    };

    return (
        <CommonPageWrapper customStyles={styles.mainCardWrapper}>
            <Container>
                <div>
                    <MainCardListContainer />
                    <div className={styles.paginatorWrapper}>
                        <Paginator
                            currentPage={currentPage}
                            onPageChange={onChangeCurrentPage}
                            pageSize={pageSize}
                            totalCount={totalCardCount}
                            portionSize={pageSize}
                        />
                    </div>
                </div>
            </Container>
        </CommonPageWrapper>
    );
};

export default CardList;
