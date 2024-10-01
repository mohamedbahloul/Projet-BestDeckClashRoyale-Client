import React from "react";

const StatsTable = ({ stats,isBestDeck=true }) => {
  return (
    <div className="stats-table">
      <table>
        {/* <thead className="stats-table__header">
          <tr>
            <th className="stats-table__header-cell">Stat</th>
            <th className="stats-table__header-cell">Number</th>
            <th className="stats-table__header-cell">Percentage</th>
          </tr>
        </thead> */}
        <tbody className="stats-table__body">
          <tr className="stats-table__row">
            <td className="stats-table__cell">Wins</td>
            <td className="stats-table__cell">{stats.wins}</td>
            <td className="stats-table__cell">{`${((stats.wins / stats.uses) * 100).toFixed(2)}%`}</td>
          </tr>
          <tr className="stats-table__row">
            <td className="stats-table__cell">Losses</td>
            <td className="stats-table__cell">{(stats.uses - stats.wins)}</td>
            <td className="stats-table__cell">{`${(((stats.uses - stats.wins) / stats.uses) * 100).toFixed(2)}%`}</td>
          </tr>
          <tr className="stats-table__row">
            <td className="stats-table__cell">Total</td>
            <td className="stats-table__cell">{stats.uses}</td>
            <td className="stats-table__cell">100%</td>
          </tr>
          {isBestDeck && (
            <>
          <tr className="stats-table__row">
            <td className="stats-table__cell">Clan Trophies</td>
            <td className="stats-table__cell">{stats.max_clan_trophies}</td>
            <td className="stats-table__cell">-------</td>
          </tr>
          <tr className="stats-table__row">
            <td className="stats-table__cell">Average deck difference</td>
            <td className="stats-table__cell">{ (stats.avg_deck_diff).toFixed(2)}</td>
            <td className="stats-table__cell">-------</td>
          </tr>
          <tr className="stats-table__row">
            <td className="stats-table__cell">Distinct player count</td>
            <td className="stats-table__cell">{stats.distinct_player_count}</td>
            <td className="stats-table__cell">-------</td>
          </tr>
          </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
