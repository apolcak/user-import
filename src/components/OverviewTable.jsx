import "./OverviewTable.scss";

const OverviewTable = ({ rows }) => {
	return (
		<div className="overview">
			{rows.map((row, index) => {
				return (
					<div key={index} className="overview__row">
						<strong>{row.name}</strong>
						<div className="ta-r">{row.value}</div>
					</div>
				);
			})}
		</div>
	);
};

export default OverviewTable;
