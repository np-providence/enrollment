<script>
let step = 0,
    userType = '';
    
console.log(step)

    function selectUserType(type){
        userType = type;
        step +=1;
    }

    function uploadFile(){
        step += 1;
    }
</script>

<style>
    .button{
        width: 20%;
        display: inline-block;
    }
    input{
        border: white 1px solid;
        border-radius: 3px;

    }
</style>

<div class="content">
{#if step === 0}
<div class="section">
    <h1>Are you importing a Attendee or an Event Owner?</h1>
    <div class="button" on:click={() => selectUserType("Attendee")}>Attendee</div> 
     <div class="button" on:click={() => selectUserType("Event Owner")}>Event Owner</div> 
</div>
{:else if step === 1}
<div class="section">
    <h1>Select File to Import {userType}</h1>
    <input type="file" name="fileupload" id="fileupload">
</div>
 <div class="button" on:click={uploadFile}>Upload</div> 
{:else}
lol
{/if}
</div>