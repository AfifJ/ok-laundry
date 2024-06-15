import React from 'react'

const Card = ({ userId, item }) => (
	<a href={`/transaksi/${userId}/${item.id}`}>
		<div
			className={`transaction-item border-black/opacity-40 inline-flex w-80 items-start justify-start rounded-xl border ${item.status.toLowerCase() !== 'selesai' ? 'bg-orange-100' : ''} p-4`}
			data-status={item.status.toLowerCase()}
		>
			<div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-3 self-stretch">
				<div className="self-stretch text-base font-semibold text-black">{item.title}</div>
				<div className="self-stretch text-xs font-normal text-black opacity-60">{item.date}</div>
			</div>
			<div className="inline-flex w-28 flex-col items-start justify-start gap-3">
				<div className="self-stretch text-right text-xs font-normal text-black">Status</div>
				<div
					className={`self-stretch text-right text-base font-bold ${item.status.toLowerCase() !== 'selesai' ? 'text-yellow-500' : 'text-green-500'}`}
				>
					{item.status}
				</div>
			</div>
		</div>
	</a>
)

export default Card
