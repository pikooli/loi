<script lang="ts">
  
    let projectName = '';
    let projectUrl = '';
    let contactEmail = '';
    let projectDescription = '';
    let commitmentText = '';
    let generatedLink = '';

    function generateLink() {
      const projectData = {
        projectName,
        projectUrl,
        contactEmail,
        projectDescription,
        commitmentText,
      };
  
      const jsonString = JSON.stringify(projectData);
      const base64String = btoa(jsonString);
      const link = `${window.location.origin}/sign/${base64String}`;
  
      generatedLink =link;
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
    <button
      type="submit"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Generate Link
    </button>
  </form>

  {#if generatedLink}
  <div class="mt-4">
    <p class="font-semibold">Your generated link:</p>
    <a href="{generatedLink}" target="_blank" class="text-blue-600 hover:underline break-all">
      {generatedLink}
    </a>
  </div>
{/if}