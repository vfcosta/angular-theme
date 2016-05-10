namespace noosfero {
    interface StatisticInfo {
        name: string;
        quantity: number;
        display: boolean;
    }
    export interface StatisticsBlock extends Block {
        statistics: StatisticInfo[];
    }
}
