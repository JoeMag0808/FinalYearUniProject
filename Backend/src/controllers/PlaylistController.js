import Playlist from "../models/Playlist.js";

export const createPlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.create({
            userId: req.user.id.toString(),
            name: req.body.name,
            exercises: req.body.exercises
        });
        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: "Error creating playlist"});
    }
};

//Display all playlists on the main playlist screen
export const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ userId: req.user.id.toString() });
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: "Error getting playlists"});
    }
};

//Display individual playlist details
export const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findOne({ 
            _id: req.params.id,
            userId: req.user.id.toString() 
        }).populate("exercises.exerciseId");

        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: "Error getting playlist"});
    }
};

export const updatePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findOneAndUpdate(
            { _id: req.params.id, 
            userId: req.user.id 
        },
        {
            name: req.body.name,
            exercises: req.body.exercises
        },
        { returnDocument: "after" }
        );
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: "Error updating playlist"});
    }
};

export const deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }
        res.json({ message: "Playlist deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting playlist"});
    }
};
