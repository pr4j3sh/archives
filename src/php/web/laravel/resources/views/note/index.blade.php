<x-layout>
    <div class="note-container">
        <a href="{{ route('note.create') }}" class="new-note-btn">
            New Note
        </a>
        <div class="notes">
            @foreach ($notes as $note)
                <div class="note">
                    <div class="note-body">
                        {{ Str::words($note->note, 20) }}
                    </div>
                    <div class="note-buttons">
                        <a href="{{ route('note.show', $note) }}" class="note-edit-btn">
                            View
                        </a>
                        <a href="{{ route('note.edit', $note) }}" class="note-edit-btn">
                            Edit
                        </a>
                        <form action="{{ route('note.destroy', $note) method="POST" }}">
                            @csrf
                            @method("DELETE")
                        </form>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</x-layout>
