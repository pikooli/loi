<script lang="ts">
	let projectName = '';
	let projectUrl = '';
	let contactEmail = '';
	let projectDescription = '';
	let commitmentText = '';
	let generatedLink = '';

	function generateLink() {
		const projectData = {
			projectName: projectName.trim(),
			projectUrl: projectUrl.trim(),
			contactEmail: contactEmail.trim(),
			projectDescription: projectDescription.trim(),
			commitmentText: commitmentText.trim()
		};

		const jsonString = JSON.stringify(projectData);
		const base64String = btoa(jsonString);
		const link = `${window.location.origin}/sign/${base64String}`;

		generatedLink = link;
	}
</script>

<h1 class="text-4xl font-bold mb-4">Define Your Project</h1>
<form on:submit|preventDefault={generateLink} class="space-y-4">
	<input
		type="text"
		bind:value={projectName}
		placeholder="Project Name"
		required
		class="w-full p-2 border border-gray-300 rounded"
	/>
	<input
		type="url"
		bind:value={projectUrl}
		placeholder="Project URL"
		class="w-full p-2 border border-gray-300 rounded"
	/>
	<input
		type="email"
		bind:value={contactEmail}
		placeholder="Contact Email"
		required
		class="w-full p-2 border border-gray-300 rounded"
	/>
	<textarea
		bind:value={projectDescription}
		placeholder="Project Description"
		class="w-full p-2 border border-gray-300 rounded h-24"
	></textarea>
	<textarea
		bind:value={commitmentText}
		placeholder="Desired Commitment Text"
		class="w-full p-2 border border-gray-300 rounded h-24"
	></textarea>
	<button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
		Generate Link
	</button>
</form>

{#if generatedLink}
	<div class="mt-4">
		<p class="font-semibold">Your generated link:</p>
		<a href={generatedLink} target="_blank" class="text-blue-600 hover:underline break-all">
			{generatedLink}
		</a>
	</div>
{/if}

<div class="mb-6 mt-12">
	<h2 class="text-2xl font-semibold mb-2">What is a Letter of Intent (LOI)?</h2>
	<p class="text-gray-700 leading-relaxed">
		A Letter of Intent (LOI) is a document that outlines the intentions of two or more parties to
		enter into a formal agreement in the future.
	</p>
	<p class="text-gray-700 leading-relaxed">
		It expresses interest and commitment towards a project, business deal, or partnership. Although
		it lays out key terms and objectives, an LOI is generally **not legally binding** and does not
		serve as a formal contract.
	</p>
	<p class="text-gray-700 leading-relaxed">
		The purpose of an LOI is to establish the framework and understanding between parties, leaving
		room for more detailed negotiations later.
	</p>
	<p class="text-gray-700 leading-relaxed mt-2">
		Signing an LOI can help clarify each party's goals, provide a timeline for negotiations, and set
		clear expectations before moving forward with more formal agreements.
	</p>
	<p class="text-gray-700 leading-relaxed">
		This process is particularly helpful in business deals, partnerships, acquisitions, or project
		collaborations.
	</p>
</div>
