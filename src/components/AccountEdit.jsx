const AccountEdit = () => {
	return (
		<div class="inline-flex h-96 w-96 flex-col items-start justify-start gap-8 bg-white">
			<div class="border-black/opacity-40 inline-flex items-center justify-center self-stretch border-b px-4 py-6">
				<div class="flex h-8 w-8 items-center justify-center py-2"></div>
				<div class="shrink grow basis-0 text-center font-['Inter'] text-2xl font-bold text-black">
					Edit Profil
				</div>
				<div class="flex h-8 w-8 items-center justify-center py-2 opacity-0"></div>
			</div>
			<div class="flex h-64 flex-col items-center justify-start gap-12 self-stretch px-8">
				<div class="flex h-44 flex-col items-start justify-start gap-7 self-stretch">
					<div class="flex h-16 flex-col items-start justify-start gap-2 self-stretch">
						<div class="self-stretch font-['Inter'] text-base font-bold text-black">Username</div>
						<div class="border-black/opacity-20 inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border px-4 py-3">
							<div></div>
						</div>
					</div>
					<div class="flex h-16 flex-col items-start justify-start gap-2 self-stretch">
						<div class="self-stretch font-['Inter'] text-base font-bold text-black">Email</div>
						<div class="border-black/opacity-20 inline-flex items-center justify-start gap-2.5 self-stretch rounded-2xl border px-4 py-3">
							<div></div>
						</div>
					</div>
				</div>
				<div class="inline-flex items-center justify-center gap-2.5 self-stretch rounded-2xl bg-green-500 px-12 py-3">
					<div class="font-['Inter'] text-xl font-bold text-white">Update Profil</div>
				</div>
			</div>
		</div>
	)
}

export default AccountEdit
