'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FeedTable } from '../interfaces/feed-table.interface';
import { feedTablesMock } from '../data/feed-tables.mock';

type FeedTableStore = {
  feedTables: FeedTable[];
  addFeedTable: (feedTable: FeedTable) => void;
  removeFeedTable: (feedTable: FeedTable) => void;
  getAllFeedTables: () => FeedTable[];
  getTableById: (id: number) => FeedTable | undefined;
};

export const useFeedTableStore = create<FeedTableStore>()(
  persist(
    (set, get) => ({
      getAllFeedTables() {
        const currentFeedTables = get().feedTables;

        if (currentFeedTables?.length > 0) {
          return currentFeedTables;
        }

        const mocks = feedTablesMock;

        set({
          feedTables: mocks
        });

        return mocks;
      },
      addFeedTable: (feedTable: Omit<FeedTable, 'id'>) => {
        let feedTables = get().feedTables;
        const newFeedTable = {
          ...feedTable,
          id: feedTables.length + 1
        };

        feedTables = feedTables.filter(
          (feedTable) => feedTable.id !== newFeedTable.id
        );

        set({
          feedTables: [...feedTables, newFeedTable]
        });
      },
      removeFeedTable: (feedTable: FeedTable) => {
        const feedTables = get().feedTables.filter(
          (currentFeedTable) => currentFeedTable.id !== feedTable.id
        );

        set({
          feedTables
        });
      },
      getTableById: (id: number) => {
        const feedTables = get().feedTables;
        return feedTables.find((feedTable) => feedTable.id === id);
      },

      feedTables: []
    }),
    {
      name: 'feed-tables-store'
    }
  )
);
